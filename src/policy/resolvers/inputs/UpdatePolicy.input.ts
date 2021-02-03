import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePolicyInput {
	@Field(() => [String], { nullable: true })
	categories: string[]

	@Field(() => [String], { nullable: true })
	legislationEvents: string[]

	@Field(() => [String], { nullable: true })
	namedEntities: string[]

	@Field({ nullable: true })
	title: string

	@Field({ nullable: true })
	description: string
}
