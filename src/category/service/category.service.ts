import { Injectable } from '@nestjs/common'
import { BaseEntityService } from '../../shared/database'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../category'

@Injectable()
export class CategoryService extends BaseEntityService(Category) {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>
	) {
		super(categoryRepository)
	}
}
