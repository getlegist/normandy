import { Injectable } from '@nestjs/common'
import {
	assignCollectionsToEntity,
	BaseEntityService,
	completeMergeEntity,
	completeUpdateEntity,
	getCollection,
} from '../../shared/database'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SaveOptions } from 'typeorm'
import { Category } from '../category'
import { CreateCategoryInput } from './inputs/CreateCategory.input'
import { NamedEntity } from '../../entities/named-entity'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { Policy } from '../../policy/policy'
import { CreateNamedEntityInput } from '../../entities/service/inputs/CreateNamedEntity.input'

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

	public async updateCategory(
		id: string,
		input: Partial<CreateCategoryInput>,
		saveOptions?: SaveOptions
	): Promise<Category> {
		return completeUpdateEntity(
			this.categoryRepository,
			id,
			input,
			['title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['entities', input.entities, this.namedEntityRepository],
				['policies', input.policies, this.policyRepository],
			]
		)
	}

	public async updateMergeCategory(
		id: string,
		input: Partial<CreateCategoryInput>,
		saveOptions?: SaveOptions
	): Promise<Category> {
		return completeMergeEntity(
			this.categoryRepository,
			id,
			input,
			['title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['entities', input.entities, this.namedEntityRepository],
				['policies', input.policies, this.policyRepository],
			]
		)
	}
}
