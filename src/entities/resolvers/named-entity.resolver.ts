import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { NamedEntityService } from '../service/named-entity.service'
import { BaseEntityResolver } from '../../shared/graphql'
import { NamedEntity } from '../named-entity'
import { CreateNamedEntityInput } from './inputs/CreateNamedEntity.input'
import { UpdateNamedEntityInput } from './inputs/UpdateNamedEntity.input'

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

	@Mutation(() => NamedEntity)
	updateMergeNamedEntity(
		@Args('id') id: string,
		@Args('input') input: UpdateNamedEntityInput
	) {
		return this.namedEntityService.updateMergeNamedEntity(id, input)
	}

	@Mutation(() => NamedEntity)
	updateNamedEntity(
		@Args('id') id: string,
		@Args('input') input: UpdateNamedEntityInput
	) {
		return this.namedEntityService.updateNamedEntity(id, input)
	}
}
