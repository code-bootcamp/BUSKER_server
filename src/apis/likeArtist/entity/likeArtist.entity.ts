import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { User } from 'src/apis/users/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class LikeArtist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User, (user) => user.liked_artist)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Artist, (artist) => artist.pick_user)
  @Field(() => Artist)
  artist: Artist;
}
