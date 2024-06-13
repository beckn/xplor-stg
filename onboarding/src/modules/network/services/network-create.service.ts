import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { OnboardNetworkDto } from '../dto/onboard-network.dto'
import { InjectModel } from '@nestjs/mongoose'
import { NetworkErrorMessages } from '../../../common/constants/error.messages'
import { HttpResponseMessage } from '../../../common/constants/http-response-message'
import { getSuccessResponse } from '../../../utils/get-success-response'

@Injectable()
export class NetworkCreateService {
  constructor(@InjectModel(NetworkModel) private readonly onboardedNetworkModel: Model<Network>) {}

  // Onboards a network and saves it to the database
  async createNetwork(onboardNetworkBody: OnboardNetworkDto): Promise<any> {
    const onboardNetwork = await this.onboardedNetworkModel.create(onboardNetworkBody)

    if (!onboardNetwork) {
      return new InternalServerErrorException(NetworkErrorMessages.ERROR_CREATE_NETWORK)
    }

    return getSuccessResponse(onboardNetwork, HttpResponseMessage.OK)
  }
}
