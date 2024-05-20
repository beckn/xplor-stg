import { Injectable } from '@nestjs/common';
import { CreateDumpDto } from '../dto/create-dump.dto';
import { Dump, DumpDocument } from '../schema/dump.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DumpService {
  constructor(@InjectModel(Dump.name) private dumpModel: Model<DumpDocument>) {}
  async create(createDumpDto: CreateDumpDto): Promise<Dump> {
    return await this.dumpModel.create(createDumpDto);
  }

  async findAll(): Promise<Dump[]> {
    return await this.dumpModel.find();
  }

  async findByTransactionId(
    transaction_id: string,
    domain: string,
  ): Promise<Dump> {
    return await this.dumpModel.findOne({ transaction_id, domain });
  }

  async findItemByProviderId(
    transactionId: string,
    providerId: string,
    id: string[],
    domain: string,
  ): Promise<Dump | null> {
    return await this.dumpModel
      .findOne({
        transaction_id: transactionId,
        domain: domain,
        'message.catalog.providers': {
          $elemMatch: {
            id: providerId,
            'items.id': { $in: id },
          },
        },
      })
      .exec();
  }
}
