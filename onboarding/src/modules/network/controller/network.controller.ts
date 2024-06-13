import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { DomainReadService } from '../services/domain-read.service'
import { OnboardNetworkDto } from '../dto/onboard-network.dto'
import { NetworkCreateService } from '../services/network-create.service'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { NetworkReadService } from '../services/network-read.service'
import { NetworkDeleteService } from '../services/network-delete.service'
import { NetworkUpdateService } from '../services/network-update.service'
import { UpdateNetworkDto } from '../dto/update-network.dto'

@Controller({ version: '1', path: 'network' })
export class NetworkController {
  constructor(
    private readonly domainReadService: DomainReadService,
    private readonly networkCreateService: NetworkCreateService,
    private readonly networkReadService: NetworkReadService,
    private readonly networkUpdateService: NetworkUpdateService,
    private readonly networkDeleteService: NetworkDeleteService,
  ) {}

  // Returns the list of domain, Xplor supports
  @Get('/domains')
  async getNetworkDomains() {
    return this.domainReadService.getDomainsList()
  }

  // Returns the list of network options that Xplor currently supports
  @Get('/options')
  async getNetworkOptions() {
    return this.networkReadService.getNetworkOptions()
  }

  // Creates a network with the required fields for network onboarding.
  @Post('/onboarding')
  async onboardNetwork(@Body() onboardNetworkBody: OnboardNetworkDto) {
    return await this.networkCreateService.createNetwork(onboardNetworkBody)
  }

  @Patch()
  async updateNetwork(@Body() updateNetworkBody: UpdateNetworkDto) {
    return await this.networkUpdateService.updateNetwork(updateNetworkBody)
  }

  // Returns the list of all the onboarded networks.
  @Get()
  async getAllNetworks(@Query() networkSearchBody: GetOnboardedNetworksDto) {
    return await this.networkReadService.getAllNetworks(networkSearchBody)
  }

  @Get('/:id')
  async getNetworkId(@Param('id') networkId: string) {
    return await this.networkReadService.getNetworkById(networkId)
  }

  @Delete('/:id')
  async deleteNetwork(@Param('id') networkId: string) {
    return await this.networkDeleteService.deleteNetwork(networkId)
  }
}
