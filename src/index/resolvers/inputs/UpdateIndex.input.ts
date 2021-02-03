import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateIndexInput {
	@Field({ nullable: true })
	start: number
	@Field({ nullable: true })
	end: number
	@Field({ nullable: true })
	legislationEvent: string
	@Field({ nullable: true })
	entity: string
}
