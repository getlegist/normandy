import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput {
	@Field({ nullable: true })
	title: string
	@Field({ nullable: true })
	description: string
	@Field(() => [String], { nullable: true })
	entities?: string[]
	@Field(() => [String], { nullable: true })
	policies?: string[]
	@Field(() => [String], { nullable: true })
	legislationEvents?: string[]
}
