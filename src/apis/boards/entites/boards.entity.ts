import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/categories/entities/categories.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Boards {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Field(() => Date)
  start_time: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Field(() => Date)
  end_time: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Field(() => Date)
  day: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isShowTime: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @ManyToOne(() => Category)
  @Field(() => Category)
  category: Category;
}
