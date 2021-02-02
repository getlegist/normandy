import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePolicyInput {
	@Field(() => [String], { nullable: true })
	categories: string[]

	@Field(() => [String], { nullable: true })
	legislationEvents: string[]

	@Field(() => [String], { nullable: true })
	namedEntities: string[]

	@Field()
	title: string

	@Field()
	description: string
}
