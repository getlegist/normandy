import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../../shared/graphql'
import { LegislationEvent } from '../legislation-event'
import { LegislationEventService } from '../service/legislation-event.service'
import { CreateLegislationEventInput } from './inputs/CreateLegislationEvent.input'

@Resolver()
export class LegislationEventResolver extends BaseEntityResolver(
	LegislationEvent
) {
	constructor(private legislationEventService: LegislationEventService) {
		super(legislationEventService)
	}

	@Mutation(() => LegislationEvent)
	createLegislationEvent(@Args('input') input: CreateLegislationEventInput) {
		return this.legislationEventService.createLegislationEvent(input)
	}

	@Mutation(() => LegislationEvent)
	createEmptyLegislationEvent() {
		return this.legislationEventService.createEmptyLegislationEvent()
	}
}
