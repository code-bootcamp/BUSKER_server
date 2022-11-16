import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ArtistImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, name: 'url' })
  url: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // artist 1:1
  @JoinColumn()
  @OneToOne(() => Artist)
  @Field(() => Artist)
  artist: Artist;
}
