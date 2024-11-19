import { Module } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
     fallbacks: {
       'es-*': 'es',
       'en-*': 'en',
     },
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, '../assets/i18n/'),
        watch: process.env.NODE_ENV === 'development',
      },
     loaderOptions: {
       path: join(__dirname, '../assets/i18n/'),
       watch: process.env.NODE_ENV === 'development',
     },
    }),
export class AppModule {}
