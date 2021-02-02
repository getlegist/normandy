import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { NamedEntityService } from '../service/named-entity.service'
import { BaseEntityResolver } from '../../shared/graphql'
import { NamedEntity } from '../named-entity'
import { CreateNamedEntityInput } from './inputs/CreateNamedEntity.input'

@Resolver()
export class NamedEntityResolver extends BaseEntityResolver(NamedEntity) {
	constructor(private namedEntityService: NamedEntityService) {
		super(namedEntityService)
	}

	@Mutation(() => NamedEntity)
	createEmptyNamedEntity() {
		return this.namedEntityService.createEmptyNamedEntity()
	}

	@Mutation(() => NamedEntity)
	createNamedEntity(@Args('input') input: CreateNamedEntityInput) {
		return this.namedEntityService.createNamedEntity(input)
	}
}
