import { Boards } from 'src/apis/boards/entites/boards.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
@ObjectType()
export class BoardImages {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  // Board 1:n
  @JoinColumn()
  @ManyToOne(() => Boards, (boards) => boards.boardImageURL)
  @Field(() => Boards)
  boards: Boards;
}
