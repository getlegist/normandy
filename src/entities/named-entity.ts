import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Index } from '../index'
import { Policy } from '../policy/policy'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { Category } from '../category/category'

@ObjectType()
@Entity()
export class NamedEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string

	@Column()
	@Field()
	type: string

	@Field(() => [Index])
	@OneToMany(() => Index, (index) => index.entity)
	indices: Index[]

	@Column()
	@Field()
	title: string

	@Column()
	@Field()
	description: string

	@Field(() => [Category])
	@ManyToMany(() => Category, (category) => category.entities)
	@JoinTable({
		name: 'named_entity_categories',
		joinColumn: { name: 'named_entity_id' },
		inverseJoinColumn: { name: 'category_id' },
	})
	categories: Category[]

	@Field(() => [Policy])
	@ManyToMany(() => Policy, (policy) => policy.entities)
	@JoinTable({
		name: 'named_entity_policies',
		joinColumn: { name: 'named_entity_id' },
		inverseJoinColumn: { name: 'policy_id' },
	})
	policies: Policy[]

	@Field(() => [LegislationEvent])
	@ManyToMany(() => LegislationEvent, (event) => event.entities)
	@JoinTable({
		name: 'named_entity_legislation_events',
		joinColumn: { name: 'named_entity_id' },
		inverseJoinColumn: { name: 'legislation_event_id' },
	})
	legislationEvents: LegislationEvent[]
}
