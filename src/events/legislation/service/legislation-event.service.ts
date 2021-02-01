import { Injectable } from '@nestjs/common'
import { BaseEntityService } from '../../../shared/database'
import { LegislationEvent } from '../legislation-event'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
}
