import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [AccountModule, SharedModule, CoreModule, RoomModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
