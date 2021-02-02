import { Injectable } from '@nestjs/common'
import {
	assignCollectionsToEntity,
	BaseEntityService,
	getCollection,
} from '../../shared/database'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NamedEntity } from '../named-entity'
import { EntityOrStrings } from '../../shared/types'
import { Index } from '../../index'
import { CreateNamedEntityInput } from './inputs/CreateNamedEntity.input'
import { Policy } from '../../policy/policy'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { Category } from '../../category/category'

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
		description,
	}: CreateNamedEntityInput): Promise<NamedEntity> {
		const entity = this.entityRepository.create()

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
}
