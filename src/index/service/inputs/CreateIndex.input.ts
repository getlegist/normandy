import { EntityOrString } from '../../../shared/types'
import { NamedEntity } from '../../../entities/named-entity'
import { LegislationEvent } from '../../../events/legislation/legislation-event'

export interface CreateIndexInput {
	start: number
	end: number
	entity: EntityOrString<NamedEntity>
	legislationEvent: EntityOrString<LegislationEvent>
}
