import { Module } from '@nestjs/common'
import { NamedEntityService } from './service/named-entity.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NamedEntity } from './named-entity'
import { NamedEntityResolver } from './resolvers/named-entity.resolver'

@Module({
	imports: [TypeOrmModule.forFeature([NamedEntity])],
	providers: [NamedEntityService, NamedEntityResolver],
	exports: [NamedEntityService],
})
export class NamedEntityModule {}
