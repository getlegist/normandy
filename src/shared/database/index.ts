import {
	FindManyOptions,
	FindOneOptions,
	RemoveOptions,
	Repository,
} from 'typeorm'
import { EntityOrStrings } from '../types'

export const getCollection = async <T>(
	types: EntityOrStrings<T>,
	repository: Repository<T>,
	findOptions?: FindManyOptions,
	suppressErrors = false
): Promise<T[]> => {
	if (types.length === 0)
		if (!suppressErrors)
			throw new Error('Array should have at least one element')
		else return []

	if (typeof types[0] === 'string') {
		const entities = await repository.findByIds(types, findOptions)
		if (entities.length !== types.length)
			if (!suppressErrors) throw new Error('Not all IDs are valid.')
			else return []
		return entities
	} else {
		return types as T[]
	}
}

export interface IBaseEntityService<Entity> {
	find(id: string, options?: FindOneOptions): Promise<Entity>
	findMany(options?: FindManyOptions): Promise<Entity[]>
	findByIDs(ids: string[], options?: FindManyOptions): Promise<Entity[]>

	remove(id: string, options?: RemoveOptions): Promise<Entity>
	removeMany(ids: string[], options?: RemoveOptions): Promise<Entity[]>

	createEmpty(): Promise<Entity>
	create(
		input: Record<string, string | number | EntityOrStrings<Entity>>
	): Promise<Entity>

	update(
		id: string,
		input: Record<string, string | number | EntityOrStrings<Entity>>
	): Promise<Entity>
}

export const BaseEntityService = <Entity>(entityRef: Entity): any => {
	abstract class BaseEntityServiceHost
		implements Partial<IBaseEntityService<Entity>> {
		constructor(private repository: Repository<Entity>) {}

		find(id: string, options?: FindOneOptions<Entity>): Promise<Entity> {
			return this.repository.findOneOrFail(id, options)
		}

		findByIDs(
			ids: string[],
			options?: FindManyOptions<Entity>
		): Promise<Entity[]> {
			return this.repository.findByIds(ids, options)
		}

		findMany(options?: FindManyOptions<Entity>): Promise<Entity[]> {
			return this.repository.find(options)
		}

		async remove(id: string, options?: RemoveOptions): Promise<Entity> {
			const entity = await this.repository.findOneOrFail(id)

			return this.repository.remove(entity, options)
		}

		async removeMany(
			ids: string[],
			options?: RemoveOptions
		): Promise<Entity[]> {
			const entities = await this.repository.findByIds(ids)

			await Promise.allSettled(entities.map((z) => this.repository.remove(z)))
			return entities
		}

		// async create(input: InputType): Promise<Entity> {
		// 	const entity = this.repository.create()
		//
		// 	const newObj = Object.entries(input).map(async ([key, _value]) => {
		// 		const value = Array.isArray(_value)
		// 			? await getCollection(
		// 					_value as EntityOrStrings<Entity>,
		// 					this.repository
		// 			  )
		// 			: _value
		//
		// 		return [key as string, value]
		// 	})
		//
		// 	console.log(newObj)
		//
		// 	console.log(
		// 		Object.fromEntries(
		// 			(newObj as unknown) as [string, Entity[] | string | number][]
		// 		)
		// 	)
		//
		// 	Object.assign(
		// 		entity,
		// 		Object.fromEntries(
		// 			(newObj as unknown) as [string, Entity[] | string | number][]
		// 		)
		// 	)
		//
		// 	return this.repository.save(entity)
		// }
		//
		// update(id: string, input: InputType): Promise<Entity> {}
	}

	return BaseEntityServiceHost
}

// TODO: Flesh out queries + mutation skeletons
// export interface BaseEntityResolver<Entity> {
// 	service: BaseEntityService<Entity>
// }
