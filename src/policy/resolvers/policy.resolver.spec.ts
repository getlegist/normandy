import { Test, TestingModule } from '@nestjs/testing'
import { PolicyResolver } from './policy.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../user/user'
import { Policy } from '../policy'
import { Index } from '../../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { Category } from '../../category/category'
import { config } from 'dotenv'
import { PolicyService } from '../service/policy.service'

describe('PolicyResolver', () => {
	let resolver: PolicyResolver

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [PolicyResolver, PolicyService],
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

		resolver = module.get<PolicyResolver>(PolicyResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
