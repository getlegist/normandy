import { Injectable } from '@nestjs/common'
import {
	assignCollectionsToEntity,
	BaseEntityService,
	getCollection,
} from '../../../shared/database'
import { LegislationEvent } from '../legislation-event'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateLegislationEventInput } from './inputs/CreateLegislationEvent.input'

@Injectable()
export class LegislationEventService extends BaseEntityService(
	LegislationEvent
) {
	constructor(
		@InjectRepository(LegislationEvent)
		private eventRepository: Repository<LegislationEvent>
	) {
		super(eventRepository)
	}

	public async createEmptyLegislationEvent(): Promise<LegislationEvent> {
		const entity = this.eventRepository.create()
		entity.description = ''
		entity.text = ''
		entity.original = ''

		entity.policies = []
		entity.indices = []
		entity.entities = []
		entity.categories = []

		await this.eventRepository.save(entity)

		return entity
	}

	public async createLegislationEvent({
		description,
		text,
		original,
		policies,
		indices,
		entities,
		categories,
	}: CreateLegislationEventInput): Promise<LegislationEvent> {
		const entity = this.eventRepository.create()

		entity.original = original
		entity.text = text
		entity.description = description

		await assignCollectionsToEntity(
			[
				['entities', entities, this.namedEntityRepository],
				['policies', policies, this.policyRepository],
				['indices', indices, this.indexRepository],
				['categories', categories, this.categoryRepository],
			],
			entity
		)

		await this.eventRepository.save(entity)

		return entity
	}
}
