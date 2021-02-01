import { Test, TestingModule } from '@nestjs/testing'
import { LegislationEventResolver } from './legislation-event.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../../user/user'
import { Policy } from '../../../policy/policy'
import { Index } from '../../../index'
import { LegislationEvent } from '../legislation-event'
import { NamedEntity } from '../../../entities/named-entity'
import { Category } from '../../../category/category'
import { config } from 'dotenv'
import { LegislationEventService } from '../service/legislation-event.service'

describe('LegislationEventResolver', () => {
	let resolver: LegislationEventResolver

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [LegislationEventResolver, LegislationEventService],
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
				TypeOrmModule.forFeature([LegislationEvent]),
			],
		}).compile()

		resolver = module.get<LegislationEventResolver>(LegislationEventResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
