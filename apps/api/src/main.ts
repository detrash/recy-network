/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // Initialize blockchain connections using Infura
  const infuraProjectId = configService.get<string>('INFURA_PROJECT_ID');
  const infuraUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;
  const web3 = new Web3(infuraUrl);
  Logger.log(`🔗 Connected to blockchain via Infura: ${infuraUrl}`);
}

bootstrap();
