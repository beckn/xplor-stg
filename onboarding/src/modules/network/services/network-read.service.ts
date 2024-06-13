import { Injectable, NotFoundException } from '@nestjs/common'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { HttpResponseMessage } from '../../../common/constants/http-response-message'
import { getSuccessResponse } from '../../../utils/get-success-response'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { NetworksList } from '../../../common/constants/network'

@Injectable()
export class NetworkReadService {
  constructor(@InjectModel(NetworkModel) private readonly onboardedNetworkModel: Model<Network>) {}

  // Returns the options to choose the network.
  async getNetworkOptions() {
    return getSuccessResponse(NetworksList, HttpResponseMessage.OK)
  }
  // Returns all the onboarded networks
  async getAllNetworks(getOnboardedNetworksBody: GetOnboardedNetworksDto): Promise<any> {
    const query: any = {}
    if (getOnboardedNetworksBody.searchQuery) {
      query.$or = [
        { name: { $regex: getOnboardedNetworksBody.searchQuery, $options: 'i' } },
        { domains: { $regex: getOnboardedNetworksBody.searchQuery, $options: 'i' } },
      ]
    }

    const skip = (getOnboardedNetworksBody.page - 1) * getOnboardedNetworksBody.pageSize
    const [networks, totalCount] = await Promise.all([
      this.onboardedNetworkModel.find(query).skip(skip).limit(getOnboardedNetworksBody.pageSize).exec(),
      this.onboardedNetworkModel.countDocuments(query).exec(), // Count total documents
    ])

    return getSuccessResponse({ networks, totalCount }, HttpResponseMessage.OK)
  }

  // Returns network details by it's id
  async getNetworkById(networkId: string): Promise<any> {
    const network = await this.onboardedNetworkModel.findOne({ _id: networkId })

    if (!network) {
      throw new NotFoundException(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }

    return getSuccessResponse(network, HttpResponseMessage.OK)
  }
}
