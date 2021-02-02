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

export interface IBaseEntityService<Entity, InputType> {
	find(id: string, options?: FindOneOptions): Promise<Entity>
	findMany(options?: FindManyOptions): Promise<Entity[]>
	findByIDs(ids: string[], options?: FindManyOptions): Promise<Entity[]>

	remove(id: string, options?: RemoveOptions): Promise<Entity>
	removeMany(ids: string[], options?: RemoveOptions): Promise<Entity[]>

	createEmpty(): Promise<Entity>
	create(input: InputType): Promise<Entity>

	update(id: string, input: Partial<InputType>): Promise<Entity>
}

export const BaseEntityService = <Entity>(entityRef: Entity): any => {
	abstract class BaseEntityServiceHost
		implements Partial<IBaseEntityService<Entity, any>> {
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
	}

	return BaseEntityServiceHost
}

export const assignCollectionsToEntity = async <T, Entity>(
	arr: Array<[string, EntityOrStrings<any>, Repository<any>]>,
	entity: Entity
) => {
	const addProperty = async (
		propertyName: string,

		repository: Repository<T>,
		input?: EntityOrStrings<T>
	) => {
		if (input === undefined) entity[propertyName] = []
		else {
			entity[propertyName] = await getCollection(input, repository).catch(
				(err) => {
					throw err
				}
			)
		}
	}

	return Promise.all(
		arr.map(([propertyName, input, repository]) =>
			addProperty(propertyName, repository, input)
		)
	)
}
