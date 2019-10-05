import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

const FEATURE_MODULES = [AccountModule, RoomModule, BookingModule];
@Module({
  imports: [CoreModule.forRoot(), SharedModule, ...FEATURE_MODULES],
})
export class AppModule {}
