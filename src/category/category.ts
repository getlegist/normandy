import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Policy } from '../policy/policy'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { NamedEntity } from '../entities/named-entity'

@ObjectType()
@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string

	@Field()
	@Column()
	title: string

	@Field()
	@Column()
	description: string

	@Field(() => [Policy])
	@ManyToMany(() => Policy, (policy) => policy.categories)
	policies: Policy[]

	@Field(() => [LegislationEvent])
	@ManyToMany(() => LegislationEvent, (event) => event.categories)
	legislationEvents: LegislationEvent[]

	@Field(() => [NamedEntity])
	@ManyToMany(() => NamedEntity, (entity) => entity.categories)
	entities: NamedEntity[]
}
