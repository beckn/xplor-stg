import { Test, TestingModule } from '@nestjs/testing'
import { NetworkDeleteService } from './network-delete.service'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { NotFoundException } from '@nestjs/common'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { getModelToken } from '@nestjs/mongoose'

describe('NetworkDeleteService', () => {
  let service: NetworkDeleteService
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
        NetworkDeleteService,
        {
          provide: getModelToken(NetworkModel),
          useValue: Model<Network>,
        },
      ],
    }).compile()

    service = module.get<NetworkDeleteService>(NetworkDeleteService)
    model = module.get<Model<Network>>(getModelToken(NetworkModel))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should delete network successfully', async () => {
    const deletedNetwork = mockNetworkModelValue

    jest.spyOn(model, 'findOneAndDelete').mockResolvedValue(deletedNetwork)

    const result = await service.deleteNetwork('networkId')

    expect(result).toHaveProperty('data', mockNetworkModelValue)
  })

  it('should throw NotFoundException if network not found', async () => {
    jest.spyOn(model, 'findOneAndDelete').mockResolvedValue(null)

    try {
      await service.deleteNetwork('nonExistentId')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }
  })
})
