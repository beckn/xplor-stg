import { Test, TestingModule } from '@nestjs/testing'
import { NetworkReadService } from './network-read.service'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { NotFoundException } from '@nestjs/common'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { getModelToken } from '@nestjs/mongoose'

describe('NetworkReadService', () => {
  let service: NetworkReadService
  let model: Model<Network>

  const mockNetworkModelValue = {
    _id: 'network_yu4me8ehie5i6ei6m5e65363633354entj',
    name: 'ONEST_NETWORK',
    domains: ['Skilling', 'Job', 'Finance'],
    bap_uri: 'https://bap.url.com/witsLab',
    bap_id: 'bap_witslab',
    callback_url: 'https://witslab.callbackurl.com/',
    registry_url: 'https://witslab.registry.com/',
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NetworkReadService,
        {
          provide: getModelToken(NetworkModel),
          useValue: Model<Network>,
        },
      ],
    }).compile()

    service = module.get<NetworkReadService>(NetworkReadService)
    model = module.get<Model<Network>>(getModelToken(NetworkModel))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should get all networks', async () => {
    const mockDto: GetOnboardedNetworksDto = { searchQuery: 'ONEST', page: 1, pageSize: 10 }
    const mockNetworks = [mockNetworkModelValue]
    jest.spyOn(model, 'find').mockReturnValue({
      skip: jest.fn().mockReturnValue({ limit: jest.fn().mockResolvedValue(mockNetworks) }),
    } as any)

    const result = await service.getAllNetworks(mockDto)

    expect(result).toHaveProperty('data', mockNetworks)
  })

  it('should throw NotFoundException if network not found by id', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(null)
    const networkId = 'nonExistentId'

    try {
      await service.getNetworkById(networkId)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }
  })

  it('should get network by id', async () => {
    const mockNetwork = mockNetworkModelValue
    jest.spyOn(model, 'findOne').mockResolvedValue(mockNetwork)

    const result = await service.getNetworkById('networkId')

    expect(result).toHaveProperty('data', mockNetworkModelValue)
  })
})
