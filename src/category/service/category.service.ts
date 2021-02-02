import { Injectable } from '@nestjs/common'
import {
	assignCollectionsToEntity,
	BaseEntityService,
	getCollection,
} from '../../shared/database'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../category'
import { CreateCategoryInput } from './inputs/CreateCategory.input'
import { NamedEntity } from '../../entities/named-entity'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { Policy } from '../../policy/policy'

@Injectable()
export class CategoryService extends BaseEntityService(Category) {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
		@InjectRepository(NamedEntity)
		private namedEntityRepository: Repository<NamedEntity>,
		@InjectRepository(LegislationEvent)
		private legislationEventRepository: Repository<LegislationEvent>,
		@InjectRepository(Policy)
		private policyRepository: Repository<Policy>
	) {
		super(categoryRepository)
	}

	public async createEmptyCategory(): Promise<Category> {
		const entity = this.categoryRepository.create()

		entity.entities = []
		entity.legislationEvents = []
		entity.policies = []
		entity.description = ''
		entity.title = ''

		await this.categoryRepository.save(entity)
		return entity
	}

	public async createCategory(input: CreateCategoryInput): Promise<Category> {
		const entity = this.categoryRepository.create()

		entity.description = input.description
		entity.title = input.title

		await assignCollectionsToEntity(
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['entities', input.entities, this.namedEntityRepository],
				['policies', input.policies, this.policyRepository],
			],
			entity
		)

		await this.categoryRepository.save(entity)

		return entity
	}
}
