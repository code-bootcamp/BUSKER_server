import { Field, ObjectType } from '@nestjs/graphql';
import { Member } from 'src/apis/members/entity/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class MemberImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  // member 1:1
  @JoinColumn()
  @OneToOne(() => Member, (member) => member.memberImageURL)
  @Field(() => Member)
  member: Member;
}
