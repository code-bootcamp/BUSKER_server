import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserAuthority {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  authority: string;

  @ManyToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'userId' })
  user: User;
}
