import { Module } from '@nestjs/common'
import { NamedEntityService } from './service/named-entity.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NamedEntity } from './named-entity'
import { NamedEntityResolver } from './resolvers/named-entity.resolver'
import { Category } from '../category/category'
import { Policy } from '../policy/policy'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { Index } from '../index'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			NamedEntity,
			Index,
			Category,
			Policy,
			LegislationEvent,
		]),
	],
	providers: [NamedEntityService, NamedEntityResolver],
	exports: [NamedEntityService],
})
export class NamedEntityModule {}
