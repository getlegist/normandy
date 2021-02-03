import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../../shared/graphql'
import { LegislationEvent } from '../legislation-event'
import { LegislationEventService } from '../service/legislation-event.service'
import { CreateLegislationEventInput } from './inputs/CreateLegislationEvent.input'
import { UpdateLegislationEventInput } from './inputs/UpdateLegislationEvent.input'

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

	@Mutation(() => LegislationEvent)
	async updateMergeLegislationEvent(
		@Args('id') id: string,
		@Args('input') input: UpdateLegislationEventInput
	) {
		return this.legislationEventService.updateMergeLegislationEvent(id, input)
	}

	@Mutation(() => LegislationEvent)
	async updateLegislationEvent(
		@Args('id') id: string,
		@Args('input') input: UpdateLegislationEventInput
	) {
		return this.legislationEventService.updateLegislationEvent(id, input)
	}
}
