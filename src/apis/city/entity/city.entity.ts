import { Field, ObjectType } from '@nestjs/graphql';
import { District } from 'src/apis/district/entity/district.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class City {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @JoinColumn()
  @OneToMany(() => District, (district) => district.city)
  @Field(() => [District])
  district: District[];
}
