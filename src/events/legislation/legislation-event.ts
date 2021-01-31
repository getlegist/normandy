import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Policy } from '../../policy/policy'
import { Category } from '../../category/category'
import { Index } from '../../index'
import { NamedEntity } from '../../entities/named-entity'

@ObjectType()
@Entity({})
export class LegislationEvent {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string

	@Field(() => [Policy])
	@ManyToMany(() => Policy, (policy) => policy.legislationEvents)
	@JoinTable({
		name: 'legislation_event_policies',
		joinColumn: { name: 'legislation_event_id' },
		inverseJoinColumn: { name: 'policy_id' },
	})
	policies: Policy[]

	@Field()
	@Column()
	text: string

	@Field()
	@Column()
	original: string

	@Field()
	@Column()
	description: string

	@Field(() => [Category])
	@ManyToMany(() => Category, (category) => category.legislationEvents)
	@JoinTable({
		name: 'legislation_event_categories',
		joinColumn: { name: 'legislation_event_id' },
		inverseJoinColumn: { name: 'category_id' },
	})
	categories: Category[]

	@Field(() => [Index])
	@OneToMany(() => Index, (index) => index.legislationEvent)
	indices: Index[]

	@Field(() => [NamedEntity])
	@ManyToMany(() => NamedEntity, (entity) => entity.legislationEvents)
	entities: NamedEntity[]
}
