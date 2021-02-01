import { Test, TestingModule } from '@nestjs/testing'
import { PolicyService } from './policy.service'
import { Policy } from '../policy'
import { Category } from '../../category/category'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../user/user'
import { Index } from '../../index'
import * as dotenv from 'dotenv'

describe('PolicyService', () => {
	let service: PolicyService

	beforeEach(async () => {
		dotenv.config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [PolicyService],
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
					Policy,
					Category,
					LegislationEvent,
					NamedEntity,
				]),
			],
		}).compile()

		service = module.get<PolicyService>(PolicyService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
