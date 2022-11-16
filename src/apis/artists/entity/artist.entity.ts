import { Member } from 'src/apis/members/entity/member.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Category } from 'src/apis/categories/entities/categories.entity';
import { LikeArtist } from 'src/apis/likeArtist/entity/likeArtist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => LikeArtist, (likeArtist) => likeArtist.artist)
  @Field(() => [LikeArtist])
  pick_user: LikeArtist[];

  // @JoinColumn()
  // @OneToOne(() => ArtistImage, (artist_image) => artist_image.artist)
  // @Field(() => ArtistImage, { nullable: true })
  // artist_image?: ArtistImage;
  @Column()
  @Field(() => String, {
    defaultValue: "'https://i.ibb.co/PYBhzR8/noprofile.jpg'",
  })
  artistImageURL: string;

  // @Column()
  // @Field(() => String, {
  //   defaultValue: "'https://i.ibb.co/PYBhzR8/noprofile.jpg'",
  // })
  // artistImageURL: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  @Field(() => Category)
  category: Category;

  @OneToMany(() => Member, (member) => member.artist)
  @Field(() => Member, { nullable: true })
  member?: Member;
}
