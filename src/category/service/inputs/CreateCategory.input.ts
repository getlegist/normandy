import { EntityOrStrings } from '../../../shared/types'
import { NamedEntity } from '../../../entities/named-entity'
import { Policy } from '../../../policy/policy'
import { LegislationEvent } from '../../../events/legislation/legislation-event'

export interface CreateCategoryInput {
	title: string
	description: string
	entities?: EntityOrStrings<NamedEntity>
	policies?: EntityOrStrings<Policy>
	legislationEvents?: EntityOrStrings<LegislationEvent>
}
