import { Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @IsEmail()
  @Column({ unique: true, type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  password: string;

  @Column({ default: false, type: 'boolean' })
  is_auth: boolean;

  @Column({ default: false, type: 'boolean' })
  is_artist: boolean;

  // @OneToOne(() => Artist)
  // @Field(() => Artist)
  // artist: string;

  // @OneToOne(() => UserImage
  // @Field(() => UserImage)
  // image: UserImage;
}
