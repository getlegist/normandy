import { Injectable } from '@nestjs/common'
import { BaseEntityService } from '../../shared/database'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NamedEntity } from '../named-entity'
import { EntityOrStrings } from '../../shared/types'
import { Index } from '../../index'

@Injectable()
export class NamedEntityService extends BaseEntityService(NamedEntity) {
	constructor(
		@InjectRepository(NamedEntity)
		private entityRepository: Repository<NamedEntity>
	) {
		super(entityRepository)
	}
}
