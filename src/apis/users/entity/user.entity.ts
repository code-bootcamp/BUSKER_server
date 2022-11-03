import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true, type: 'varchar', length: 20 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 200 })
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
