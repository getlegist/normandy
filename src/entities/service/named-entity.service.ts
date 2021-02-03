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
import { NamedEntity } from '../named-entity'
import { EntityOrStrings } from '../../shared/types'
import { Index } from '../../index'
import { CreateNamedEntityInput } from './inputs/CreateNamedEntity.input'
import { Policy } from '../../policy/policy'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { Category } from '../../category/category'
import { CreateLegislationEventInput } from '../../events/legislation/service/inputs/CreateLegislationEvent.input'

@Injectable()
export class NamedEntityService extends BaseEntityService(NamedEntity) {
	constructor(
		@InjectRepository(NamedEntity)
		private entityRepository: Repository<NamedEntity>,
		@InjectRepository(Index)
		private indexRepository: Repository<Index>,
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
		@InjectRepository(LegislationEvent)
		private legislationEventRepository: Repository<LegislationEvent>,
		@InjectRepository(Policy)
		private policyRepository: Repository<Policy>
	) {
		super(entityRepository)
	}

	public async createEmptyNamedEntity(): Promise<NamedEntity> {
		const entity = this.entityRepository.create()
		entity.categories = []
		entity.legislationEvents = []
		entity.indices = []
		entity.policies = []
		entity.title = ''
		entity.description = ''

		await this.entityRepository.save(entity)

		return entity
	}

	public async createNamedEntity({
		categories,
		legislationEvents,
		indices,
		policies,
		title,
		type,
		description,
	}: CreateNamedEntityInput): Promise<NamedEntity> {
		const entity = this.entityRepository.create()

		entity.type = type
		entity.description = description
		entity.title = title

		await assignCollectionsToEntity(
			[
				[
					'legislationEvents',
					legislationEvents,
					this.legislationEventRepository,
				],
				['policies', policies, this.policyRepository],
				['indices', indices, this.indexRepository],
				['categories', categories, this.categoryRepository],
			],
			entity
		)

		await this.entityRepository.save(entity)

		return entity
	}

	public async updateNamedEntity(
		id: string,
		input: Partial<CreateNamedEntityInput>,
		saveOptions?: SaveOptions
	): Promise<NamedEntity> {
		return completeUpdateEntity(
			this.eventRepository,
			id,
			input,
			['type', 'title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['policies', input.policies, this.policyRepository],
				['indices', input.indices, this.indexRepository],
				['categories', input.categories, this.categoryRepository],
			]
		)
	}

	public async updateMergeNamedEntity(
		id: string,
		input: Partial<CreateNamedEntityInput>,
		saveOptions?: SaveOptions
	): Promise<NamedEntity> {
		return completeMergeEntity(
			this.eventRepository,
			id,
			input,
			['type', 'title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['policies', input.policies, this.policyRepository],
				['indices', input.indices, this.indexRepository],
				['categories', input.categories, this.categoryRepository],
			]
		)
	}
}
