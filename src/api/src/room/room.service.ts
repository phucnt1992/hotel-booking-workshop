import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { Photo } from './photo.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  public async findOneById(id: string): Promise<Room> {
    return await this.roomRepository.findOneOrFail(id);
  }

  public async findAll(): Promise<[Room[], number]> {
    return await this.roomRepository.findAndCount();
  }

  public async insertOne(room: Room, photos: Photo[]): Promise<string> {
    return await this.roomRepository.insert(room);
  }

  public async updateOne(room: Room, photos: Photo[]): Promise<Room> {
    return await this.roomRepository.update(room);
  }

  public async deleteOne(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
