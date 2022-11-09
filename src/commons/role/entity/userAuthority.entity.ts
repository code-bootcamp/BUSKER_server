import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { User } from 'src/apis/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserAuthority {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  userId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => String)
  artistId: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  authority: string;

  @OneToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Artist, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  @Field(() => Artist)
  artist: Artist;
}
