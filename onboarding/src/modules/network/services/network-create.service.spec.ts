import { Test, TestingModule } from '@nestjs/testing'
import { NetworkCreateService } from './network-create.service'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { InternalServerErrorException } from '@nestjs/common'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { getModelToken } from '@nestjs/mongoose'

describe('NetworkCreateService', () => {
  let service: NetworkCreateService
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
        NetworkCreateService,
        {
          provide: getModelToken(NetworkModel),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<NetworkCreateService>(NetworkCreateService)
    model = module.get<Model<Network>>(getModelToken(NetworkModel))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create network successfully', async () => {
    const onboardNetworkBody = mockNetworkModelValue
    jest.spyOn(model, 'create').mockResolvedValue(mockNetworkModelValue as any)
    const result = await service.createNetwork(onboardNetworkBody)

    expect(result).toHaveProperty('data', mockNetworkModelValue)
  })

  it('should handle error while creating network', async () => {
    const onboardNetworkBody = mockNetworkModelValue
    jest.spyOn(model, 'create').mockResolvedValue(null)

    try {
      await service.createNetwork(onboardNetworkBody)
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException)
      expect(error.message).toBe(NetworkErrorMessages.ERROR_CREATE_NETWORK)
    }
  })
})
