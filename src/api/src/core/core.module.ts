import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class CoreModule {
  public static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      providers: [LoggerService],
      exports: [LoggerService],
    };
  }
}
