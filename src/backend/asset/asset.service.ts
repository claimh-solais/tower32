import { Injectable } from '@nestjs/common';
import { Req, Res } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

import { Request } from 'fastify/lib/request';
import { Response } from 'fastify/lib/request';

import _ from 'lodash';
import * as requestPromise from 'request-promise';

@Injectable()
export class AssetService {
    public assetURL: string;
    // public shopId: string;

    constructor(private readonly configService: ConfigService) {
        // this.shopId = this.configService.get('SHOP_ID');
        this.assetURL = this.configService.get('ASSET_URL');
    }

    makeRequest(options): Promise<any> {
        return requestPromise({
            method: 'GET',
            baseUrl: `http://${this.assetURL}`,
            headers: {},
            json: true,
            ...options,
        });
    }

    getDefaultOptions(): object {
        return {
            target: `http://${this.assetURL}/`,
            selfHandleResponse: true,
            pathRewrite: { '^/': '/' },
            headers: {},
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

    async getHeadTagHTML() {
        const envName = process.env.NODE_ENV || 'development';

        return this.makeRequest({
            url: (envName === 'production') ? '/asset/index.html' : `/asset/`,
        });
    }
}
