import { Field, ObjectType } from '@nestjs/graphql';
import { Boards } from 'src/apis/boards/entites/boards.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BoardAddress {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  address_city: string;

  @Column()
  @Field(() => String)
  address_district: string;

  @Column()
  @Field(() => String)
  lat: string;

  @Column()
  @Field(() => String)
  lng: string;

  @JoinColumn()
  @OneToOne(() => Boards)
  boardId: Boards;
}
