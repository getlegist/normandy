import { Test, TestingModule } from '@nestjs/testing'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from '../service/category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { Index } from '../../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { Category } from '../category'
import { config } from 'dotenv'

describe('CategoryResolver', () => {
	let resolver: CategoryResolver

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryResolver, CategoryService],
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					url: process.env.db,
					entities: [
						User,
						Policy,
						Index,
						LegislationEvent,
						NamedEntity,
						Category,
					],
				}),
				TypeOrmModule.forFeature([
					Category,
					LegislationEvent,
					Policy,
					NamedEntity,
				]),
			],
		}).compile()

		resolver = module.get<CategoryResolver>(CategoryResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
