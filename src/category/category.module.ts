import { Module } from '@nestjs/common'
import { CategoryService } from './service/category.service'
import { CategoryResolver } from './resolvers/category.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category'
import { Index } from '../index'

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoryService, CategoryResolver],
	exports: [CategoryService],
})
export class CategoryModule {}
