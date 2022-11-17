import { MembersModule } from './apis/members/members.module';
import { FilesModule } from './apis/files/files.modules';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, flatten, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { UsersModule } from './apis/users/users.module';

import * as redisStore from 'cache-manager-redis-store';
import { ArtistsModule } from './apis/artists/artists.module';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import { LikeArtistModule } from './apis/likeArtist/likeArtist.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CommentModule } from './apis/comments/comment.module';
import { MapModule } from './apis/map/map.module';
import { AppController } from './app.controller';
import { DistrictModule } from './apis/district/district.module';
import { CategoryModule } from './apis/categories/categories.module';
import { CityModule } from './apis/city/city.module';

@Module({
  imports: [
    CityModule,
    CategoryModule,
    DistrictModule,
    CommentModule,
    LikeArtistModule,
    BoardsModule,
    UsersModule,
    FilesModule,
    ArtistsModule,
    MembersModule,
    AuthModule,
    MapModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: ['http://localhost:3000', 'https://busker.shop'],
        credentials: true,
        exposedHeaders: ['Set-Cookie', 'Cookie'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
          'Access-Control-Allow-Headers',
          'Authorization',
          'X-Requested-With',
          'Content-Type',
          'Accept',
        ],
      },
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
