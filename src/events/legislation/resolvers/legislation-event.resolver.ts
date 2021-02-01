import { Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../../shared/graphql'
import { LegislationEvent } from '../legislation-event'
import { LegislationEventService } from '../service/legislation-event.service'

@Resolver()
export class LegislationEventResolver extends BaseEntityResolver(
	LegislationEvent
) {
	constructor(private legislationEventService: LegislationEventService) {
		super(legislationEventService)
	}
}
