import { Field } from '@nestjs/graphql';
import { User } from 'src/apis/users/entity/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  image: string;

  // userId 1:1로 연결
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
