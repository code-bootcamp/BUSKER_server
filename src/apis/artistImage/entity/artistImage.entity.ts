import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import {
  Column,
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

  @Column()
  @Field(() => String)
  url: string;

  // artist 1:1
  @JoinColumn()
  @OneToOne(() => Artist, (artist) => artist.artistImageURL)
  @Field(() => Artist)
  artist: Artist;
}
