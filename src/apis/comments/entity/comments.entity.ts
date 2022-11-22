import { Field, ObjectType } from '@nestjs/graphql';
import { Boards } from 'src/apis/boards/entites/boards.entity';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => Boards, (board) => board.comments)
  @Field(() => Boards)
  board: Boards;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;
}
