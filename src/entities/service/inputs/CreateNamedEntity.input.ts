import { EntityOrStrings } from '../../../shared/types'
import { Index } from '../../../index'
import { Category } from '../../../category/category'
import { Policy } from '../../../policy/policy'
import { LegislationEvent } from '../../../events/legislation/legislation-event'

export interface CreateNamedEntityInput {
	title: string
	description: string
	indices?: EntityOrStrings<Index>
	categories?: EntityOrStrings<Category>
	policies?: EntityOrStrings<Policy>
	legislationEvents?: EntityOrStrings<LegislationEvent>
}
