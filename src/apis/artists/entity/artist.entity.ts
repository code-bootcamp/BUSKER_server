import { Field, ObjectType } from '@nestjs/graphql';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Category } from 'src/apis/categories/entities/categories.entity';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  @Field(() => String)
  active_name: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  description: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  promotion_url: string;

  @ManyToMany(() => User, (user) => user.liked_artist)
  @Field(() => [User])
  user: User[];

  @OneToOne(() => ArtistImage, { nullable: true })
  @Field(() => ArtistImage)
  artist_image: ArtistImage;

  @OneToOne(() => Category, { nullable: true })
  @Field(() => Category)
  category: Category;
}
