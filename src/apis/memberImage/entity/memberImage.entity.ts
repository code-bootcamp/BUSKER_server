import { Field } from '@nestjs/graphql';
import { Member } from 'src/apis/members/entity/member.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  // member 1:1
  @OneToOne(() => Member)
  @Field(() => Member)
  member: Member;
}
