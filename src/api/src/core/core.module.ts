import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';

import { DatabaseService } from './database.service';
import { LoggerService } from './logger.service';

@Module({})
export class CoreModule {
  public static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      imports: [SharedModule],
      providers: [LoggerService],
      exports: [
        LoggerService,
        TypeOrmModule.forRootAsync({
          useClass: DatabaseService,
        }),
      ],
    };
  }
}
