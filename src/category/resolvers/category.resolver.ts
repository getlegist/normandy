import { Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../shared/graphql'
import { Category } from '../category'
import { CategoryService } from '../service/category.service'

@Resolver()
export class CategoryResolver extends BaseEntityResolver(Category) {
	constructor(private categoryService: CategoryService) {
		super(categoryService)
	}
}
