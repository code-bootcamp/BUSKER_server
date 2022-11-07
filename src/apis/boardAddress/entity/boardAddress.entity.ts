import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Boards } from 'src/apis/boards/entites/boards.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  lng: number;
}
