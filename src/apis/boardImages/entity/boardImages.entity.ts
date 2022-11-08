import { Boards } from 'src/apis/boards/entites/boards.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
@ObjectType()
export class BoardImages {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  url: string;

  @ManyToOne(() => Boards, (boards) => boards.boardImages)
  @Field(() => Boards)
  boards: Boards;
}
