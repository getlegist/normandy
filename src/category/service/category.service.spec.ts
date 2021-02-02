import { Test, TestingModule } from '@nestjs/testing'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from '../category'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { Index } from '../../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { config } from 'dotenv'

describe('CategoryService', () => {
	let service: CategoryService

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryService],
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
					NamedEntity,
					LegislationEvent,
					Policy,
				]),
			],
		}).compile()

		service = module.get<CategoryService>(CategoryService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
