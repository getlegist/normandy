import { Injectable } from '@nestjs/common'
import {
	assignStaticOptional,
	BaseEntityService,
	completeMergeEntity,
	completeUpdateEntity,
	constructRelations,
	getCollection,
} from '../../shared/database'
import { Index } from '../index'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SaveOptions } from 'typeorm'
import { CreateIndexInput } from './inputs/CreateIndex.input'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { CreatePolicyInput } from '../../policy/service/inputs/CreatePolicy.input'
import { Policy } from '../../policy/policy'

@Injectable()
export class IndexService extends BaseEntityService(Index) {
	constructor(
		@InjectRepository(Index) private indexRepository: Repository<Index>,
		@InjectRepository(LegislationEvent)
		private legislationEventRepository: Repository<LegislationEvent>,
		@InjectRepository(NamedEntity)
		private namedEntityRepository: Repository<NamedEntity>
	) {
		super(indexRepository)
	}

	async create(input: CreateIndexInput): Promise<Index> {
		const entity = this.indexRepository.create()

		entity.legislationEvent = (
			await getCollection(
				[input.legislationEvent],
				this.legislationEventRepository
			).catch((err) => {
				throw err
			})
		)[0]

		entity.entity = (
			await getCollection([input.entity], this.namedEntityRepository).catch(
				(err) => {
					throw err
				}
			)
		)[0]

		entity.start = input.start
		entity.end = input.end

		await this.indexRepository.save(entity)

		return entity
	}

	public async updateIndex(
		id: string,
		input: Partial<CreateIndexInput>,
		saveOptions?: SaveOptions
	): Promise<Index> {
		const entity = await this.indexRepository.findOneOrFail(id, {
			relations: constructRelations(input, ['legislationEvent', 'entity']),
		})
		const assign = assignStaticOptional(entity, input)

		assign('start')
		assign('end')

		if (input.entity !== undefined) {
			if (typeof input.entity === 'string') {
				const namedEntity = await this.namedEntityRepository.findOneOrFail(
					input.entity
				)
				entity.entity = namedEntity
			} else {
				entity.entity = input.entity
			}
		}

		if (input.legislationEvent !== undefined) {
			if (typeof input.legislationEvent === 'string') {
				const legislationEvent = await this.legislationEventRepository.findOneOrFail(
					input.legislationEvent
				)
				entity.legislationEvent = legislationEvent
			} else {
				entity.legislationEvent = input.legislationEvent
			}
		}

		await this.indexRepository.save(entity)

		return entity
	}
}
