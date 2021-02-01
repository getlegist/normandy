import { Injectable } from '@nestjs/common'
import { BaseEntityService } from '../../shared/database'
import { Index } from '../index'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class IndexService extends BaseEntityService(Index) {
	constructor(
		@InjectRepository(Index) private indexRepository: Repository<Index>
	) {
		super(indexRepository)
	}
}
