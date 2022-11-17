import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/apis/categories/entities/categories.entity';
import { LikeArtist } from 'src/apis/likeArtist/entity/likeArtist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  @Field(() => String)
  active_name: string;

  @Column({ type: 'varchar', length: 500 })
  @Field(() => String)
  description: string;

  @Column({ type: 'varchar', length: 500 })
  @Field(() => String)
  promotion_url: string;

  @OneToMany(() => LikeArtist, (likeArtist) => likeArtist.artist)
  @Field(() => [LikeArtist])
  pick_user: LikeArtist[];

  @Column()
  @Field(() => String)
  artistImageURL: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  @Field(() => Category)
  category: Category;
}
