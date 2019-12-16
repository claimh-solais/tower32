import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

// import * as requestPromise from 'request-promise';

@Injectable()
export class AppService {
  // private inventoryClusterURL: string;
  // private shopId: string;

  constructor(private readonly configService: ConfigService) {
    // this.shopId = this.configService.get('SHOP_ID');
    // this.inventoryClusterURL = this.configService.get('INVENTORY_CLUSTER_API_URL');
  }

  // makeRequest(options): Promise<any> {
  //   return requestPromise({
  //     method: 'GET',
  //     baseUrl: `http://${this.inventoryClusterURL}`,
  //     headers: { 'X-Shop-Id': this.shopId },
  //     json: true,
  //     ...options,
  //   });
  // }
}
