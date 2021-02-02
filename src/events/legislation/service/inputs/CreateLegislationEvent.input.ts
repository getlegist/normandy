import { EntityOrStrings } from '../../../../shared/types'
import { Policy } from '../../../../policy/policy'
import { NamedEntity } from '../../../../entities/named-entity'
import { Category } from '../../../../category/category'
import { Index } from '../../../../index'

export interface CreateLegislationEventInput {
	policies?: EntityOrStrings<Policy>
	categories?: EntityOrStrings<Category>
	indices?: EntityOrStrings<Index>
	entities?: EntityOrStrings<NamedEntity>
	text: string
	original: string
	description: string
}
