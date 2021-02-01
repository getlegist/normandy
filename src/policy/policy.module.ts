import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Policy } from './policy'
import { PolicyService } from './service/policy.service'
import { PolicyResolver } from './resolvers/policy.resolver'
import { Category } from '../category/category'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { NamedEntity } from '../entities/named-entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Policy, Category, LegislationEvent, NamedEntity]),
	],
	exports: [PolicyService],
	providers: [PolicyService, PolicyResolver],
})
export class PolicyModule {}
