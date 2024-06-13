import { Injectable, NotFoundException } from '@nestjs/common'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { HttpResponseMessage } from '../../../common/constants/http-response-message'
import { getSuccessResponse } from '../../../utils/get-success-response'

@Injectable()
export class NetworkDeleteService {
  constructor(@InjectModel(NetworkModel) private readonly onboardedNetworkModel: Model<Network>) {}

  // Deletes a network by the networkId
  async deleteNetwork(networkId: string): Promise<any> {
    const deletedNetwork = await this.onboardedNetworkModel.findOneAndDelete({ _id: networkId })

    if (!deletedNetwork) {
      throw new NotFoundException(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }

    return getSuccessResponse(deletedNetwork, HttpResponseMessage.OK)
  }
}
