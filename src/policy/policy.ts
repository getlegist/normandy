import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { Category } from '../category/category'
import { NamedEntity } from '../entities/named-entity'

@ObjectType()
@Entity()
export class Policy {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string

	@Field(() => [LegislationEvent])
	@ManyToMany(() => LegislationEvent, (event) => event.policies)
	legislationEvents: LegislationEvent[]

	@ManyToMany(() => Category, (category) => category.policies)
	@Field(() => [Category])
	@JoinTable({
		name: 'policy_categories',
		joinColumn: { name: 'policy_id' },
		inverseJoinColumn: { name: 'category_id' },
	})
	categories: Category[]

	@Field()
	@Column()
	title: string

	@Field()
	@Column()
	description: string

	@Field(() => [NamedEntity])
	@ManyToMany(() => NamedEntity, (entity) => entity.categories)
	entities: NamedEntity[]
}
