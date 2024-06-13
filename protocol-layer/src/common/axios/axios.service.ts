// Import necessary modules and services
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';

// Import Grafana logger service for logging
import { GrafanaLoggerService } from '../../services/grafana/service/grafana.service';
// Import internal messages for logging
import { InternalMessages } from '../constants/logger-message';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AxiosService {
  // Constructor to inject dependencies
  constructor(
    private readonly httpService: HttpService, // Service for making HTTP requests
    private readonly loggerService: GrafanaLoggerService, // Service for logging
  ) {}

  // Method to perform a GET request
  async get(url: string, params?: any, headers?: any) {
    try {
      // Perform the GET request and return the data
      return (await this.httpService.axiosRef.get(url, { params, headers }))
        ?.data;
    } catch (error) {
      // Handle any errors that occur during the request
    }
  }

  // Method to perform a POST request
  async post(url: string, data: any, headers?: any) {
    try {
      // Perform the POST request with the provided data and headers
      return (
        await this.httpService.axiosRef.post(url, data, {
          headers,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false, // Allow requests to servers with self-signed certificates
          }),
        })
      )?.data;
    } catch (error) {
      // Log the error using the Grafana logger service
      this.loggerService.sendDebug({
        message: `${InternalMessages.POST_REQUEST} ${error}`,
        methodName: this.post.name,
      });
      // Return the error to the caller
      return error;
    }
  }

  // Method to perform a PUT request
  async put(url: string, data: any, headers?: any) {
    try {
      // Perform the PUT request with the provided data and headers
      return (
        await this.httpService.axiosRef.put(url, data, {
          headers,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false, // Allow requests to servers with self-signed certificates
          }),
        })
      )?.data;
    } catch (error) {
      // Log the error using the Grafana logger service
      this.loggerService.sendDebug({
        message: `${InternalMessages.PUT_REQUEST} ${error}`,
        methodName: this.put.name,
      });
      // Return the error to the caller
      return error;
    }
  }

  // Method to perform a DELETE request
  async delete(url: string, params?: any, headers?: any) {
    try {
      // Perform the DELETE request with the provided params and headers
      return (await this.httpService.axiosRef.delete(url, { params, headers }))
        ?.data;
    } catch (error) {
      // Log the error using the Grafana logger service
      this.loggerService.sendDebug({
        message: `${InternalMessages.DELETE_REQUEST} ${error}`,
        methodName: this.delete.name,
      });
      // Return the error to the caller
      return error;
    }
  }
}
