import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
	@Field()
	title: string
	@Field()
	description: string
	@Field(() => [String], { nullable: true })
	entities?: string[]
	@Field(() => [String], { nullable: true })
	policies?: string[]
	@Field(() => [String], { nullable: true })
	legislationEvents?: string[]
}
