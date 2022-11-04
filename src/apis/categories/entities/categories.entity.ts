import { Field, ObjectType } from '@nestjs/graphql';
import { Boards } from 'src/apis/boards/entites/boards.entity';

import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @ManyToOne(() => Boards)
  @Field(() => Boards)
  boards: Boards;
}
