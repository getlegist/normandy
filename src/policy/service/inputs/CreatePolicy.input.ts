import { Category } from '../../../category/category'
import { LegislationEvent } from '../../../events/legislation/legislation-event'
import { NamedEntity } from '../../../entities/named-entity'

export interface CreatePolicyInput {
	categories?: string[] | Category[]
	legislationEvents?: string[] | LegislationEvent[]
	namedEntities?: string[] | NamedEntity[]
	title: string
	description: string
}
