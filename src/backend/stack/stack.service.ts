import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as requestPromise from 'request-promise';

@Injectable()
export class StackService {

    constructor(private readonly configService: ConfigService) { }

    makeRequest(options): Promise<any> {
        return requestPromise({
            method: 'GET',
            // baseUrl: `http://${this.inventoryClusterURL}`,
            headers: { },
            json: true,
            ...options,
        });
    }
}
