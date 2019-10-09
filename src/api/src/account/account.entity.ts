import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('bool', { name: 'is_admin', default: true })
  isAdmin: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @Column('text', { name: 'first_name' })
  firstName: string;

  @Column('text', { name: 'last_name' })
  lastName: string;

  @Column('text', { name: 'avatar_url' })
  avatarUrl: string;
}
