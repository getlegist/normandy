import { Injectable } from '@nestjs/common'
import { BaseEntityService, getCollection } from '../../shared/database'
import { Index } from '../index'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateIndexInput } from './inputs/CreateIndex.input'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'

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
}
