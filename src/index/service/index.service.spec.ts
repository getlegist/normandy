import { Test, TestingModule } from '@nestjs/testing'
import { IndexService } from './index.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Index } from '../index'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { Category } from '../../category/category'
import { config } from 'dotenv'

describe('IndexService', () => {
	let service: IndexService

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [IndexService],
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
				TypeOrmModule.forFeature([Index]),
			],
		}).compile()

		service = module.get<IndexService>(IndexService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
