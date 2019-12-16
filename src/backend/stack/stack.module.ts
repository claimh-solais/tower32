import { Module } from '@nestjs/common';
import { StackController } from './stack.controller';
import { ConfigModule } from '../config/config.module';
import { StackService } from './stack.service';
import { AssetService } from '../asset/asset.service';

@Module({
    imports: [
        ConfigModule.register(),
    ],
    providers: [StackService, AssetService],
    controllers: [StackController],
})
export class StackModule {}
