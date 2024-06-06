import { Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { getSignatureHeader } from '../../utils/beckn.authorization';

@Injectable()
export class HeaderInterceptorService implements OnModuleInit {
  private axiosInstance: AxiosInstance;
  private privateKey: string;
  private publicKey: string;
  private subscriberId: string;
  private belemUniqueKey: string;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create();
    this.privateKey = this.configService.get<string>('BELEM_PRIVATE_KEY');
    this.publicKey = this.configService.get<string>('BELEM_PUBLIC_KEY');
    this.subscriberId = this.configService.get<string>('BELEM_SUBSCRIBER_ID');
    this.belemUniqueKey = this.configService.get<string>('BELEM_UNIQUE_KEY');
  }

  onModuleInit() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const requestBody = config.data;
        console.log('requestBody', requestBody);
        config.headers['Authorization'] = `${await getSignatureHeader(
          this.privateKey,
          this.publicKey,
          this.subscriberId,
          this.belemUniqueKey,
          requestBody,
        )}`;
        console.log('config.headers', await config.headers['Authorization']);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
