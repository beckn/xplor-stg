import { Test, TestingModule } from '@nestjs/testing'
import { NetworkController } from './network.controller'
import { DomainReadService } from '../services/domain-read.service'
import { NetworkCreateService } from '../services/network-create.service'
import { NetworkReadService } from '../services/network-read.service'
import { NetworkDeleteService } from '../services/network-delete.service'
import { NetworkUpdateService } from '../services/network-update.service'
import { OnboardNetworkDto } from '../dto/onboard-network.dto'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { UpdateNetworkDto } from '../dto/update-network.dto'
import { getModelToken } from '@nestjs/mongoose'
import { NetworkModel } from '../schema/network.schema'

describe('NetworkController', () => {
  let controller: NetworkController
  let domainReadService: DomainReadService
  let networkCreateService: NetworkCreateService
  let networkReadService: NetworkReadService
  let networkUpdateService: NetworkUpdateService

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
      controllers: [NetworkController],
      providers: [
        DomainReadService,
        NetworkCreateService,
        NetworkReadService,
        NetworkUpdateService,
        NetworkDeleteService,
        {
          provide: getModelToken(NetworkModel),
          useValue: {
            create: jest.fn().mockReturnValue(mockNetworkModelValue),
            findOne: jest.fn().mockReturnValue(mockNetworkModelValue),
            findOneAndDelete: jest.fn().mockReturnValue(mockNetworkModelValue),
            findOneAndUpdate: jest.fn().mockReturnValue(mockNetworkModelValue),
          },
        },
      ],
    }).compile()

    controller = module.get<NetworkController>(NetworkController)
    domainReadService = module.get<DomainReadService>(DomainReadService)
    networkCreateService = module.get<NetworkCreateService>(NetworkCreateService)
    networkReadService = module.get<NetworkReadService>(NetworkReadService)
    networkUpdateService = module.get<NetworkUpdateService>(NetworkUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return domains list', async () => {
    const domains = ['domain1', 'domain2'] // Mocked domains list
    jest.spyOn(domainReadService, 'getDomainsList').mockResolvedValue(domains)

    expect(await controller.getNetworkDomains()).toBe(domains)
  })

  it('should onboard network', async () => {
    const onboardNetworkDto: OnboardNetworkDto = {
      name: 'ONEST_NETWORK',
      domains: ['Skilling', 'Job', 'Finance'],
      bap_uri: 'https://bap.url.com/witsLab',
      bap_id: 'bap_witslab',
      callback_url: 'https://witslab.callbackurl.com/',
      registry_url: 'https://witslab.registry.com/',
    }
    const createdNetwork = {
      _id: 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398',
      name: 'ONEST_NETWORK',
      domains: ['Skilling', 'Job', 'Finance'],
      bap_uri: 'https://bap.url.com/witsLab',
      bap_id: 'bap_witslab',
      callback_url: 'https://witslab.callbackurl.com/',
      registry_url: 'https://witslab.registry.com/',
    }
    jest.spyOn(networkCreateService, 'createNetwork').mockResolvedValue(createdNetwork)

    expect(await controller.onboardNetwork(onboardNetworkDto)).toBe(createdNetwork)
  })

  it('should update network', async () => {
    const updateNetworkDto: UpdateNetworkDto = {
      networkId: 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398',
      name: 'ONEST_NETWORK',
      domains: ['Skilling', 'Job', 'Finance'],
      bap_uri: 'https://bap.url.com/witsLab',
      bap_id: 'bap_witslab',
      callback_url: 'https://witslab.callbackurl.com/',
      registry_url: 'https://witslab.registry.com/',
    }
    const updatedNetwork = {
      networkId: 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398',
      name: 'ONEST_NETWORK',
      domains: ['Skilling', 'Job', 'Finance'],
      bap_uri: 'https://bap.url.com/witsLab',
      bap_id: 'bap_witslab',
      callback_url: 'https://witslab.callbackurl.com/',
      registry_url: 'https://witslab.registry.com/',
    }
    jest.spyOn(networkUpdateService, 'updateNetwork').mockResolvedValue(updatedNetwork)

    expect(await controller.updateNetwork(updateNetworkDto)).toBe(updatedNetwork)
  })

  it('should delete network', async () => {
    const networkId = 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398'
    const updatedNetwork = {
      networkId: 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398',
      name: 'ONEST_NETWORK',
      domains: ['Skilling', 'Job', 'Finance'],
      bap_uri: 'https://bap.url.com/witsLab',
      bap_id: 'bap_witslab',
      callback_url: 'https://witslab.callbackurl.com/',
      registry_url: 'https://witslab.registry.com/',
    }
    jest.spyOn(controller['networkDeleteService'], 'deleteNetwork').mockResolvedValue(updatedNetwork)

    expect(await controller.deleteNetwork(networkId)).toEqual(updatedNetwork)
  })
  it('should get all networks', async () => {
    const networkSearchDto: GetOnboardedNetworksDto = {
      page: 1,
      pageSize: 20,
      searchQuery: 'ONEST',
    }
    const networks = [
      {
        networkId: 'network_3ca296e2-3e61-4935-965b-5cd9ecf1c398',
        name: 'ONEST_NETWORK',
        domains: ['Skilling', 'Job', 'Finance'],
        bap_uri: 'https://bap.url.com/witsLab',
        bap_id: 'bap_witslab',
        callback_url: 'https://witslab.callbackurl.com/',
        registry_url: 'https://witslab.registry.com/',
      },
    ]
    jest.spyOn(networkReadService, 'getAllNetworks').mockResolvedValue(networks)

    expect(await controller.getAllNetworks(networkSearchDto)).toBe(networks)
  })

  // Similar test cases for getNetworkId and deleteNetwork methods
})
