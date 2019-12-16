import { Injectable } from '@nestjs/common';
import { Req, Res } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

import { Request } from 'fastify/lib/request';
import { Response } from 'fastify/lib/request';

import _ from 'lodash';
import * as requestPromise from 'request-promise';

@Injectable()
export class APIv1Service {
    public inventoryClusterURL: string;
    public shopId: string;

    constructor(private readonly configService: ConfigService) {
        this.shopId = this.configService.get('SHOP_ID');
        this.inventoryClusterURL = this.configService.get('INVENTORY_CLUSTER_API_URL');
    }

    makeRequest(options): Promise<any> {
        return requestPromise({
            method: 'GET',
            baseUrl: `http://${this.inventoryClusterURL}`,
            headers: {
                'X-Shop-Id': this.shopId,
            },
            json: true,
            ...options,
        });
    }

    getDefaultOptions(): object {
        return {
            target: `http://${this.inventoryClusterURL}`,
            selfHandleResponse: true,
            pathRewrite: { '^/apiv1': '' },
            headers: { 'X-Shop-Id': this.shopId },
            onProxyRes: this.onProxyRes.bind(this),
        };
    }

    onProxyRes(proxyRes: any, @Req() req: Request, @Res() res: Response): any {
        let body = Buffer.from([]);

        proxyRes.on('data', (chunk) => {
            body = Buffer.concat([body, chunk]);
        });

        proxyRes.on('end', async () => {
            res.writeHead(200, proxyRes.headers);
            res.write(body);

            return res.end();
        });
    }
}
