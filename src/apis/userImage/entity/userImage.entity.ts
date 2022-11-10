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

  @Column({ default: '' })
  @Field(() => String, { nullable: true })
  url: string;

  // user 1:1로 연결
  @JoinColumn()
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
