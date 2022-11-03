import { Field, ObjectType } from '@nestjs/graphql';
// import { Category } from 'src/apis/category/entites/category.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @Column()
  @Field(() => Date)
  start_time: Date;

  @Column()
  @Field(() => Date)
  end_time: Date;

  @Column()
  @Field(() => Date)
  day: Date;

  @Column()
  @Field(() => Boolean)
  isShowTime: boolean;

  // @JoinColumn()
  // @OneToOne(() => Category)
  // @Field(() => Category)
  // category: Category;
}
