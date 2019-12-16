import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { APIv1Service } from './apiv1.service';

import * as httpProxy from 'http-proxy-middleware';

@Module({
    imports: [
        ConfigModule.register({ folder: './config' }),
    ],
    providers: [APIv1Service],
    controllers: [],
})

export class APIv1Module {
    constructor(private readonly apiv1Service: APIv1Service) { }

    /**
     * Apply http-proxy-middleware for Gateway Routes.
     * For more information, see: https://github.com/chimurai/http-proxy-middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer) {
        const proxyOpts = this.apiv1Service.getDefaultOptions();
        consumer.apply(httpProxy('/api', proxyOpts)).forRoutes('*');
    }
}
