import { Artist } from 'src/apis/artists/entity/artist.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column(() => String)
  name: string;

  @Column(() => String)
  role: string;

  @ManyToOne(() => Artist)
  @Field(() => Artist)
  artist: Artist;
}
