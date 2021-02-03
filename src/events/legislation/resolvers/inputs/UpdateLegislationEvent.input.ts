import { EntityOrStrings } from '../../../../shared/types'
import { Policy } from '../../../../policy/policy'
import { Category } from '../../../../category/category'
import { Index } from '../../../../index'
import { NamedEntity } from '../../../../entities/named-entity'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateLegislationEventInput {
	@Field(() => [String], { nullable: true })
	policies?: string[]
	@Field(() => [String], { nullable: true })
	categories?: string[]
	@Field(() => [String], { nullable: true })
	indices?: string[]
	@Field(() => [String], { nullable: true })
	entities?: string[]
	@Field({ nullable: true })
	text: string
	@Field({ nullable: true })
	original: string
	@Field({ nullable: true })
	description: string
}
