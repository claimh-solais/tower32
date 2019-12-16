import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AssetService } from './asset.service';

import * as httpProxy from 'http-proxy-middleware';

@Module({
    imports: [
        ConfigModule.register({ folder: './config' }),
    ],
    providers: [AssetService],
    controllers: [],
})

export class AssetModule {
    constructor(private readonly assetService: AssetService) { }

    /**
     * Apply http-proxy-middleware for Gateway Routes.
     * For more information, see: https://github.com/chimurai/http-proxy-middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer) {
        const envName = process.env.NODE_ENV || 'development';
        if (envName === 'production') {
            return false;
        }
        const proxyOpts = this.assetService.getDefaultOptions();
        consumer.apply(httpProxy('/asset/', proxyOpts)).forRoutes('*');
    }
}
