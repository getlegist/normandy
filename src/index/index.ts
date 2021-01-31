import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { NamedEntity } from '../entities/named-entity'
import { LegislationEvent } from '../events/legislation/legislation-event'

@ObjectType()
@Entity()
export class Index {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string

	@Field(() => Int)
	@Column()
	start: number

	@Field(() => Int)
	@Column()
	end: number

	@Field(() => NamedEntity)
	@ManyToOne(() => NamedEntity, (entity) => entity.indices)
	entity: NamedEntity

	@Field(() => LegislationEvent, { nullable: true })
	@ManyToOne(() => LegislationEvent, (event) => event.indices)
	legislationEvent?: LegislationEvent
}
