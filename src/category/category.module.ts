import { Module } from '@nestjs/common'
import { CategoryService } from './service/category.service'
import { CategoryResolver } from './resolvers/category.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category'
import { NamedEntity } from '../entities/named-entity'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { Policy } from '../policy/policy'

@Module({
	imports: [
		TypeOrmModule.forFeature([Category, NamedEntity, LegislationEvent, Policy]),
	],
	providers: [CategoryService, CategoryResolver],
	exports: [CategoryService],
})
export class CategoryModule {}
