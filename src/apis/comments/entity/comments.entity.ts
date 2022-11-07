import { Field, ObjectType } from '@nestjs/graphql';
import { Boards } from 'src/apis/boards/entites/boards.entity';
import { User } from 'src/apis/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => Boards)
  @Field(() => Boards)
  board: Boards;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
