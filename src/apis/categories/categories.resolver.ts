import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './categories.service';
import { Category } from './entities/categories.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('name') name: string) {
    return await this.categoryService.create({ name });
  }

  @Query(() => [Category])
  async fetchCategories() {
    return await this.categoryService.findAll();
  }
}
