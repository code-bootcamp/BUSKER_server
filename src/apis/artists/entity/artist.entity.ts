import { Field } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String)
  active_name: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  description: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  promotion_url: string;

  //   @OneToOne(() => ArtistImage)
  //   @Field(() => ArtistImage)
  //   artist_image: ArtistImage;

  // @OneToOne(() => Category)
  // @Field(() => Category)
  // category: Category;
}
