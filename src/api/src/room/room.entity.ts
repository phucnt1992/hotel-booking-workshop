import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account } from '../account/account.entity';
import { Photo } from './photo.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  slug: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @OneToOne(() => Account)
  @JoinColumn()
  createdUser: Account;

  @OneToOne(() => Account)
  @JoinColumn()
  updatedUser: Account;

  @OneToMany(type => Photo, photo => photo.room, { cascade: true })
  @JoinColumn()
  photos: Photo[];
}
