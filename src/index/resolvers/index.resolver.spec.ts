import { Test, TestingModule } from '@nestjs/testing'
import { IndexResolver } from './index.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { Index } from '../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { Category } from '../../category/category'
import { config } from 'dotenv'
import { IndexService } from '../service/index.service'

describe('IndexResolver', () => {
	let resolver: IndexResolver

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [IndexResolver, IndexService],
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

		resolver = module.get<IndexResolver>(IndexResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
