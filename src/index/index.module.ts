import { Module } from '@nestjs/common'
import { IndexService } from './service/index.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Index } from './index'
import { IndexResolver } from './resolvers/index.resolver'
import { LegislationEvent } from '../events/legislation/legislation-event'
import { NamedEntity } from '../entities/named-entity'

@Module({
	providers: [IndexService, IndexResolver],
	imports: [TypeOrmModule.forFeature([Index, LegislationEvent, NamedEntity])],
})
export class IndexModule {}
