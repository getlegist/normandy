import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../shared/graphql'
import { Category } from '../category'
import { CategoryService } from '../service/category.service'
import { CreateCategoryInput } from './inputs/CreateCategory.input'

@Resolver()
export class CategoryResolver extends BaseEntityResolver(Category) {
	constructor(private categoryService: CategoryService) {
		super(categoryService)
	}

	@Mutation(() => Category)
	createEmptyCategory() {
		return this.categoryService.createEmptyCategory()
	}

	@Mutation(() => Category)
	createCategory(@Args('input') input: CreateCategoryInput) {
		return this.categoryService.createCategory(input)
	}
}
