import { join } from 'path';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AssetService } from './asset/asset.service';

import { ConfigModule } from './config/config.module';
import { StackModule } from './stack/stack.module';
// import { APIv1Module } from './apiv1/apiv1.module';
import { AssetModule } from './asset/asset.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.register(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../../', `./resource/data.sqlite`),
      entities: [],
      logging: true,
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'test',
      // entities: [],
      // synchronize: true,
    }),
    // APIv1Module,
    AssetModule,
    StackModule,
  ],
  controllers: [AppController],
  providers: [AppService, AssetService],
})
export class AppModule {}
