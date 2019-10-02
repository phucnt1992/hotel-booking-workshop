import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  username: string;

  @Column('text', { select: false, nullable: false })
  password: string;

  @Column('text', { select: false, nullable: false })
  salt: string;

  @Column('bool', { default: true })
  isAdmin: string;

  @Column('datetime', { default: Date.now })
  created: Date;

  @Column('datetime')
  modified: Date;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  avatarUrl: string;
}
