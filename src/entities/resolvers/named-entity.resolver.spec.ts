import { Test, TestingModule } from '@nestjs/testing'
import { NamedEntityResolver } from './named-entity.resolver'
import { NamedEntityService } from '../service/named-entity.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { Index } from '../../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../named-entity'
import { Category } from '../../category/category'
import { config } from 'dotenv'

describe('NamedEntityResolver', () => {
	let resolver: NamedEntityResolver

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
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
					NamedEntity,
					Category,
					LegislationEvent,
					Policy,
					Index,
				]),
			],
			providers: [NamedEntityResolver, NamedEntityService],
		}).compile()

		resolver = module.get<NamedEntityResolver>(NamedEntityResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
