import { Field, ObjectType } from '@nestjs/graphql';
import { City } from 'src/apis/city/entity/city.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class District {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  district: string;

  @ManyToOne(() => City)
  @Field(() => City)
  city: City;
}
