import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { BaseEntityResolver } from '../../shared/graphql'
import { Index } from '../index'
import { IndexService } from '../service/index.service'
import { CreateIndexInput } from './inputs/CreateIndex.input'

@Resolver()
export class IndexResolver extends BaseEntityResolver(Index) {
	constructor(private indexService: IndexService) {
		super(indexService)
	}

	@Mutation(() => Index)
	createIndex(@Args('input') input: CreateIndexInput) {
		return this.indexService.create(input)
	}
}
