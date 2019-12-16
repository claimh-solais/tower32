import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envName = process.env.NODE_ENV || 'development';
  const rootDir = join(__dirname, (envName === 'production') ? '../' : '../');

  app.useStaticAssets({
    root: join(rootDir, 'dist/public/'),
    prefix: '/asset/',
  });

  app.setViewEngine({
    engine: {
      nunjucks: require('nunjucks'),
    },
    templates: join(rootDir, 'views'),
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
