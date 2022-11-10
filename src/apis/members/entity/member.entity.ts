import { MemberImage } from './../../memberImage/entity/memberImage.entity';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Artist)
  @Field(() => Artist)
  artist: Artist;

  @OneToOne(() => MemberImage)
  @Field(() => MemberImage)
  image: MemberImage;
}
