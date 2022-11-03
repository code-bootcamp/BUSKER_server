import { Field } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  image: string;

  // member 1:1
  // @OneToOne(() => Member)
  // @Field(() => Member)
  // member: Member;
}
