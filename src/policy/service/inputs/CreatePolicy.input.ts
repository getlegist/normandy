import { Category } from '../../../category/category'
import { LegislationEvent } from '../../../events/legislation/legislation-event'
import { NamedEntity } from '../../../entities/named-entity'
import { EntityOrStrings } from '../../../shared/types'

export interface CreatePolicyInput {
	categories?: EntityOrStrings<Category>
	legislationEvents?: EntityOrStrings<LegislationEvent>
	namedEntities?: EntityOrStrings<NamedEntity>
	title: string
	description: string
}
