import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateIndexInput {
	@Field()
	start: number
	@Field()
	end: number
	@Field()
	legislationEvent: string
	@Field()
	entity: string
}
