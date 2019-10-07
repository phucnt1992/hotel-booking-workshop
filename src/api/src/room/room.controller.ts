import { Controller, Get, Post, Patch, Put, Delete } from '@nestjs/common';

@Controller('room')
export class RoomController {
  @Get()
  getAll() {}

  @Post()
  createOne() {}

  @Put()
  updateOne() {}

  @Patch()
  updatePartialOne() {}

  @Delete()
  deleteOne() {}
}
