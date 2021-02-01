import { Module } from '@nestjs/common'
import { IndexService } from './service/index.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Index } from './index'
import { IndexResolver } from './resolvers/index.resolver';

@Module({
	providers: [IndexService, IndexResolver],
	imports: [TypeOrmModule.forFeature([Index])],
})
export class IndexModule {}
