import { Injectable } from '@nestjs/common'
import { DomainsList } from '../../../common/constants/domains.constant'
import { HttpResponseMessage } from '../../../common/constants/http-response-message'
import { getSuccessResponse } from '../../../utils/get-success-response'

@Injectable()
export class DomainReadService {
  async getDomainsList() {
    return getSuccessResponse(DomainsList, HttpResponseMessage.OK)
  }
}
