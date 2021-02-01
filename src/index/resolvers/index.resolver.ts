import { Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../shared/graphql'
import { Category } from '../../category/category'
import { CategoryService } from '../../category/service/category.service'
import { Index } from '../index'
import { IndexService } from '../service/index.service'

@Resolver()
export class IndexResolver extends BaseEntityResolver(Index) {
	constructor(private indexService: IndexService) {
		super(indexService)
	}
}
