import { Test, TestingModule } from '@nestjs/testing'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { getModelToken } from '@nestjs/mongoose'
import { NetworkUpdateService } from './network-update.service'
import { UpdateNetworkDto } from '../dto/update-network.dto'
import { NotFoundException } from '@nestjs/common'

describe('NetworkUpdateService', () => {
  let service: NetworkUpdateService
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

  const mockUpdateNetworkModelValue: UpdateNetworkDto = {
    networkId: 'network_yu4me8ehie5i6ei6m5e65363633354entj',
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
        NetworkUpdateService,
        {
          provide: getModelToken(NetworkModel),
          useValue: {
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<NetworkUpdateService>(NetworkUpdateService)
    model = module.get<Model<Network>>(getModelToken(NetworkModel))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create network successfully', async () => {
    const onboardNetworkBody = mockUpdateNetworkModelValue
    jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(mockNetworkModelValue as any)
    const result = await service.updateNetwork(onboardNetworkBody)

    expect(result).toEqual(mockNetworkModelValue)
  })

  it('should handle error while creating network', async () => {
    const onboardNetworkBody = mockUpdateNetworkModelValue
    jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(null)

    try {
      await service.updateNetwork(onboardNetworkBody)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }
  })
})
