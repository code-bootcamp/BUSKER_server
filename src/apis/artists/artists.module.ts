import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/jwt-access.stategy';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { RoleService } from 'src/commons/role/role.service';
import { Category } from '../categories/entities/categories.entity';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { Artist } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Artist, UserAuthority])],
  providers: [ArtistsResolver, ArtistsService, JwtAccessStrategy, RoleService],
})
export class ArtistsModule {}
