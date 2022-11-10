import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  // user 1:1로 연결
  @JoinColumn()
  @OneToOne(() => User, (user) => user.userImage)
  @Field(() => User)
  user: User;
}
