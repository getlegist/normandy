import { Module } from '@nestjs/common'
import { LegislationEventService } from './service/legislation-event.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Index } from '../../index'
import { LegislationEvent } from './legislation-event'
import { LegislationEventResolver } from './resolvers/legislation-event.resolver';

@Module({
	providers: [LegislationEventService, LegislationEventResolver],
	imports: [TypeOrmModule.forFeature([LegislationEvent])],
})
export class LegislationEventModule {}
