import { Test, TestingModule } from '@nestjs/testing'
import { NamedEntityService } from './named-entity.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NamedEntity } from '../named-entity'
import { User } from '../../user/user'
import { Policy } from '../../policy/policy'
import { Index } from '../../index'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { Category } from '../../category/category'
import { config } from 'dotenv'

describe('NamedEntityService', () => {
	let service: NamedEntityService

	beforeEach(async () => {
		config()
		const module: TestingModule = await Test.createTestingModule({
			providers: [NamedEntityService],
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
		}).compile()

		service = module.get<NamedEntityService>(NamedEntityService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
