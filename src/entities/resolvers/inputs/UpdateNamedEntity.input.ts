import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateNamedEntityInput {
	@Field({ nullable: true })
	title: string
	@Field({ nullable: true })
	description: string

	@Field({ nullable: true })
	type: string
	@Field(() => [String], { nullable: true })
	indices?: string[]
	@Field(() => [String], { nullable: true })
	categories?: string[]
	@Field(() => [String], { nullable: true })
	policies?: string[]
	@Field(() => [String], { nullable: true })
	legislationEvents?: string[]
}
