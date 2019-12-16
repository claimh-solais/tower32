import { Controller, Get, Render, Req } from '@nestjs/common';
import { StackService } from './stack.service';
import { AssetService } from '../asset/asset.service';
import { Request } from 'fastify/lib/request';

@Controller('stack')
export class StackController {
    constructor(
        private readonly stackService: StackService,
        private readonly assetService: AssetService,
    ) { }

    @Get(':stackId')
    @Render('stack/page.njk')
    async root(@Req() req: Request) {
        const { stackId } = req.params;

        const headTagHTML = await this.assetService.getHeadTagHTML();
        return { headTagHTML };

        // const stackInfos = await this
        //     .stackService
        //     .makeRequest({ url: `/stacks?ro=false` });

        // const categoryInfo = await this
        //     .categoryService
        //     .makeRequest({ url: `/category/${categoryId}` });
    }
}
