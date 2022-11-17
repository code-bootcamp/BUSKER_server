import { MemberImage } from './../../memberImage/entity/memberImage.entity';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn()
  @ManyToOne(() => Artist)
  @Field(() => Artist, { nullable: true })
  artist: Artist;

  @Column()
  @Field(() => String)
  memberImageURL: string;
}
