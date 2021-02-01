import { Test, TestingModule } from '@nestjs/testing'
import { LegislationEventService } from './legislation-event.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegislationEvent } from '../legislation-event'
import { User } from '../../../user/user'
import { Policy } from '../../../policy/policy'
import { Index } from '../../../index'
import { NamedEntity } from '../../../entities/named-entity'
import { Category } from '../../../category/category'
import { config } from 'dotenv'

describe('LegislationEventService', () => {
	let service: LegislationEventService

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [LegislationEventService],
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

		service = module.get<LegislationEventService>(LegislationEventService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
