import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  name: string;

  @Column('text', { select: false, nullable: false })
  description: string;

  @Column('text', { select: false, nullable: false })
  salt: string;

  @Column('bool', { default: true })
  isAdmin: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  avatarUrl: string;
}
