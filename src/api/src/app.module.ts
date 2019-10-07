import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { BookingModule } from './booking/booking.module';
import { CoreModule } from './core/core.module';
import { RoomModule } from './room/room.module';
import { SharedModule } from './shared/shared.module';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { AuthModule } from './auth/auth.module';

const FEATURE_MODULES = [AccountModule, RoomModule, BookingModule, AuthModule];
@Module({
  imports: [CoreModule.forRoot(), SharedModule, ...FEATURE_MODULES],
})
export class AppModule {}
