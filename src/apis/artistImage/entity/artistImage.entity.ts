import { Field } from '@nestjs/graphql';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  image: string;

  // artist 1:1로 연결
  @OneToOne(() => Artist)
  @Field(() => Artist)
  artist: Artist;
}
