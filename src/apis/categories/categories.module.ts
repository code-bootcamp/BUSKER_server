import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './categories.resolver';
import { CategoryService } from './categories.service';
import { Category } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
