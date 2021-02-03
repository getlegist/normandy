import {
	FindManyOptions,
	FindOneOptions,
	RemoveOptions,
	Repository,
	SaveOptions,
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

export const mergeCollectionsWithEntity = async <T, Entity>(
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
			entity[propertyName] = [
				...new Set(
					entity[propertyName].concat(
						await getCollection(input, repository).catch((err) => {
							throw err
						})
					)
				),
			]
		}
	}

	return Promise.all(
		arr.map(([propertyName, input, repository]) =>
			addProperty(propertyName, repository, input)
		)
	)
}

export const assignStaticOptional = (entity, input) => (key: string) => {
	if (input[key] !== undefined) entity[key] = input[key]
}

export const assignStatics = <T>(entity: T, input, keys: (keyof T)[]) => {
	const assign = assignStaticOptional(entity, input)

	for (const key of keys) {
		assign(key as string)
	}
}

export const completeMergeEntity = async <BaseEntity>(
	entityRepository: Repository<BaseEntity>,
	id: string,
	input: any,
	statics: (keyof BaseEntity)[],
	collections: Array<[string, EntityOrStrings<any>, Repository<any>]>,
	saveOptions?: SaveOptions
) => {
	const entity = await entityRepository.findOneOrFail(id, {
		relations: constructRelations(
			input,
			constructRelations(
				input,
				collections.map((z) => z[0])
			)
		),
	})

	assignStatics(entity, input, statics)

	await mergeCollectionsWithEntity(collections, entity)

	await entityRepository.save(entity, saveOptions)

	return entity
}

export const completeUpdateEntity = async <BaseEntity>(
	entityRepository: Repository<BaseEntity>,
	id: string,
	input: any,
	statics: (keyof BaseEntity)[],
	collections: Array<[string, EntityOrStrings<any>, Repository<any>]>,
	saveOptions?: SaveOptions
) => {
	const entity = await entityRepository.findOneOrFail(id, {
		relations: constructRelations(
			input,
			constructRelations(
				input,
				collections.map((z) => z[0])
			)
		),
	})

	assignStatics(entity, input, statics)

	await assignCollectionsToEntity(collections, entity)

	await entityRepository.save(entity, saveOptions)

	return entity
}

export const constructRelations = (
	obj: Record<string, any>,
	keys: string[]
) => {
	const relations = []
	for (const key of keys) if (obj[key] !== undefined) relations.push(key)
	return relations
}
