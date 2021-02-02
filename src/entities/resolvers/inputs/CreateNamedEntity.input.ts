import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateNamedEntityInput {
	@Field()
	title: string
	@Field()
	description: string
	@Field(() => [String], { nullable: true })
	indices?: string[]
	@Field(() => [String], { nullable: true })
	categories?: string[]
	@Field(() => [String], { nullable: true })
	policies?: string[]
	@Field(() => [String], { nullable: true })
	legislationEvents?: string[]
}
