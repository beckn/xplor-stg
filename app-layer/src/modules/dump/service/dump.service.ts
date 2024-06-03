import { Injectable } from '@nestjs/common';
import { CreateDumpDto } from '../dto/create-dump.dto';
import { Dump, DumpDocument } from '../schema/dump.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OnestContextConstants } from '../../../common/constants/context.constant';

@Injectable()
export class DumpService {
  constructor(@InjectModel(Dump.name) private dumpModel: Model<DumpDocument>) {}
  async create(createDumpDto: CreateDumpDto): Promise<Dump> {
    return await this.dumpModel.create(createDumpDto);
  }

  async findAll(): Promise<Dump[]> {
    return await this.dumpModel.find();
  }

  async findBytransaction_id(
    transaction_id: string,
    domain: string,
  ): Promise<Dump> {
    return await this.dumpModel.findOne({ transaction_id, domain });
  }

  async findByActiontransaction_id(
    transaction_id: string,
    domain: string,
    request_type: string,
  ): Promise<any> {
    return {
      context: {
        bap_id: OnestContextConstants.bap_id,
        bap_uri: OnestContextConstants.bap_uri + `/${domain}`,
        bpp_id: 'infosys.springboard.io',
        bpp_uri: 'https://infosys.springboard.io',
      },
    };
    return await this.dumpModel.findOne({
      transaction_id,
      domain,
      request_type,
    });
  }
  async findItemByprovider_id(
    transaction_id: string,
    provider_id: string,
    id: string[],
    domain: string,
  ): Promise<Dump | any> {
    return {
      context: {
        bap_id: OnestContextConstants.bap_id,
        bap_uri: OnestContextConstants.bap_uri + `/${domain}`,
        bpp_id: 'infosys.springboard.io',
        bpp_uri: 'https://infosys.springboard.io',
      },
      fulfillments: [
        {
          id: '{{$randomUUID}}',
          customer: {
            person: {
              name: 'Jane Doe',
              age: '13',
              gender: 'female',
              tags: [
                {
                  descriptor: {
                    code: 'professional-details',
                    name: 'Professional Details',
                  },
                  list: [
                    {
                      descriptor: {
                        code: 'profession',
                        name: 'profession',
                      },
                      value: 'student',
                    },
                  ],
                  display: true,
                },
              ],
            },
            contact: {
              phone: '+91-9663088848',
              email: 'jane.doe@example.com',
            },
          },
        },
      ],
    };
    return await this.dumpModel
      .findOne({
        transaction_id: transaction_id,
        domain: domain,
        'message.catalog.providers': {
          $elemMatch: {
            id: provider_id,
            'items.id': { $in: id },
          },
        },
      })
      .exec();
  }

  async findByprovider_id(
    transaction_id: string,
    provider_id: string,
    domain: string,
  ): Promise<Dump | any> {
    return {
      context: {
        bpp_id: 'infosys.springboard.io',
        bpp_uri: 'https://infosys.springboard.io',
      },
    };
    return await this.dumpModel
      .findOne({
        transaction_id: transaction_id,
        domain: domain,
        'message.catalog.providers': {
          $elemMatch: {
            id: provider_id,
          },
        },
      })
      .exec();
  }

  async findItemByActionprovider_id(
    transaction_id: string,
    provider_id: string,
    domain: string,
    action: string,
    id: string[],
  ): Promise<Dump | null> {
    return await this.dumpModel
      .findOne({
        transaction_id: transaction_id,
        domain: domain,
        request_type: action,
        'message.catalog.providers': {
          $elemMatch: {
            id: provider_id,
            'items.id': { $in: id },
          },
        },
      })
      .exec();
  }
  async upsertDump(providerId: string, dumpData: any): Promise<DumpDocument> {
    const filter = { provider_id: providerId };
    const update = { ...dumpData }; // Assuming dumpData contains the updated data
    const options = { upsert: true };

    const dump = await this.dumpModel.findOneAndUpdate(filter, update, options);
    return dump;
  }
}
