import { Injectable, NotFoundException } from '@nestjs/common'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { UpdateNetworkDto } from '../dto/update-network.dto'

@Injectable()
export class NetworkUpdateService {
  constructor(@InjectModel(NetworkModel) private readonly onboardedNetworkModel: Model<Network>) {}

  // Updates only the entered fields on the network
  async updateNetwork(updateNetworkBody: UpdateNetworkDto): Promise<any> {
    const updatedNetwork = await this.onboardedNetworkModel.findOneAndUpdate(
      { _id: updateNetworkBody.networkId },
      updateNetworkBody,
      { new: true, runValidators: true },
    )

    if (!updatedNetwork) {
      throw new NotFoundException(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }

    return updatedNetwork
  }
}
