import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Policy } from '../policy'
import {
	FindManyOptions,
	FindOneOptions,
	RemoveOptions,
	Repository,
	SaveOptions,
} from 'typeorm'
import { CreatePolicyInput } from './inputs/CreatePolicy.input'
import { Category } from '../../category/category'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import {
	assignCollectionsToEntity,
	assignStaticOptional,
	assignStatics,
	BaseEntityService,
	completeMergeEntity,
	completeUpdateEntity,
	constructRelations,
	getCollection,
	IBaseEntityService,
	mergeCollectionsWithEntity,
} from '../../shared/database'
import construct = Reflect.construct

@Injectable()
export class PolicyService extends BaseEntityService(Policy) {
	constructor(
		@InjectRepository(Policy) private policyRepository: Repository<Policy>,
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
		@InjectRepository(LegislationEvent)
		private legislationEventRepository: Repository<LegislationEvent>,
		@InjectRepository(NamedEntity)
		private namedEntityRepository: Repository<NamedEntity>
	) {
		super(policyRepository)
	}

	public async createEmptyPolicy(options?: SaveOptions): Promise<Policy> {
		const policy = new Policy()
		policy.categories = []
		policy.legislationEvents = []
		policy.entities = []
		policy.title = ''
		policy.description = ''
		return this.policyRepository.save(policy, options)
	}

	public async createPolicy(
		{
			categories,
			description,
			legislationEvents,
			namedEntities,
			title,
		}: CreatePolicyInput,
		saveOptions?: SaveOptions
	): Promise<Policy> {
		const entity = new Policy()

		entity.title = title
		entity.description = title

		await assignCollectionsToEntity(
			[
				[
					'legislationEvents',
					legislationEvents,
					this.legislationEventRepository,
				],
				['entities', namedEntities, this.namedEntityRepository],
				['categories', categories, this.categoryRepository],
			],
			entity
		)

		await this.policyRepository.save(entity, saveOptions)

		return entity
	}

	public async updatePolicy(
		id: string,
		input: Partial<CreatePolicyInput>,
		saveOptions?: SaveOptions
	): Promise<Policy> {
		return completeUpdateEntity(
			this.policyRepository,
			id,
			input,
			['title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['entities', input.namedEntities, this.namedEntityRepository],
				['categories', input.categories, this.categoryRepository],
			]
		)
	}

	public async updateMergePolicy(
		id: string,
		input: Partial<CreatePolicyInput>,
		saveOptions?: SaveOptions
	): Promise<Policy> {
		return completeMergeEntity(
			this.policyRepository,
			id,
			input,
			['title', 'description'],
			[
				[
					'legislationEvents',
					input.legislationEvents,
					this.legislationEventRepository,
				],
				['entities', input.namedEntities, this.namedEntityRepository],
				['categories', input.categories, this.categoryRepository],
			]
		)
	}
}
