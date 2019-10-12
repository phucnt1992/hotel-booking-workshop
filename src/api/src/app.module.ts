import { Module } from '@nestjs/common';

import { AzureStorageModule } from '@nestjs/azure-storage';

import { AccountModule } from './account/account.module';
import { BookingModule } from './booking/booking.module';

import { RoomModule } from './room/room.module';
import { SharedModule } from './shared';
import { AuthModule } from './auth/auth.module';

const FEATURE_MODULES = [AccountModule, RoomModule, BookingModule, AuthModule];
@Module({
  imports: [SharedModule, ...FEATURE_MODULES],
})
export class AppModule {}
