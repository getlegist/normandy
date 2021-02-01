import { Type } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { BaseEntityService, IBaseEntityService } from '../database'
import { plural } from 'pluralize'
import { mapPaginationToFindProps, PaginationInput } from './Pagination'

export const BaseEntityResolver = <Entity extends Type<unknown>>(
	associatedEntityReference: Entity
): any => {
	@Resolver({ isAbstract: true })
	abstract class AbstractBase {
		constructor(private service: IBaseEntityService<Entity>) {}

		@Query(() => [associatedEntityReference], {
			name: `find${plural(associatedEntityReference.name)}`,
		})
		async findMany(
			@Args('options', { nullable: true }) options: PaginationInput
		): Promise<Entity[]> {
			return this.service.findMany({
				...mapPaginationToFindProps(options),
			})
		}

		@Query(() => [associatedEntityReference], {
			name: `find${associatedEntityReference.name}`,
		})
		async find(@Args('id') id: string): Promise<Entity> {
			return this.service.find(id)
		}

		@Query(() => [associatedEntityReference], {
			name: `find${associatedEntityReference.name}ByIDs`,
		})
		async findByIDs(
			@Args('ids', { type: () => [String] }) ids: string[]
		): Promise<Entity[]> {
			return this.service.findByIDs(ids)
		}

		@Mutation(() => associatedEntityReference, {
			name: `createEmpty${associatedEntityReference.name}`,
		})
		async createEmpty() {
			return this.service.createEmpty()
		}

		@Mutation(() => associatedEntityReference, {
			name: `remove${associatedEntityReference.name}`,
		})
		async remove(@Args('id') id: string) {
			return this.service.remove(id)
		}

		@Mutation(() => [associatedEntityReference], {
			name: `remove${plural(associatedEntityReference.name)}`,
		})
		async removeMany(@Args('ids', { type: () => [String] }) ids: string[]) {
			return this.service.removeMany(ids)
		}
	}

	return AbstractBase
}
