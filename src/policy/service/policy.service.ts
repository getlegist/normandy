import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Policy } from '../policy'
import {
	FindManyOptions,
	FindOneOptions,
	RemoveOptions,
	Repository,
	SaveOptions,
} from 'typeorm'
import { CreatePolicyInput } from './inputs/CreatePolicy.input'
import { Category } from '../../category/category'
import { LegislationEvent } from '../../events/legislation/legislation-event'
import { NamedEntity } from '../../entities/named-entity'
import { BaseEntityService, getCollection } from '../../shared/database'

@Injectable()
export class PolicyService extends BaseEntityService(Policy) {
	constructor(
		@InjectRepository(Policy) private policyRepository: Repository<Policy>,
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
		@InjectRepository(LegislationEvent)
		private legislationEventRepository: Repository<LegislationEvent>,
		@InjectRepository(NamedEntity)
		private namedEntityRepository: Repository<NamedEntity>
	) {
		super(policyRepository)
	}

	// public findAll(options?: FindManyOptions<Policy>) {}
	//
	// public findOne(id: string, options?: FindOneOptions<Policy>) {}
	//
	// public async remove(id: string): Promise<Policy>
	// public async remove(id: string[]): Promise<Policy[]>
	// public async remove(id: string | string[]) {
	// 	const ids = Array.isArray(id) ? id : [id]
	//
	// 	const policies = await this.policyRepository.findByIds(ids)
	//
	// 	if (policies.length === 0) {
	// 		throw new Error(`Could not find Policies with IDs of ${ids.toString()}`)
	// 	}
	//
	// 	await this.policyRepository.remove(policies)
	//
	// 	if (policies.length === 1) return policies[0]
	//
	// 	return policies
	// }

	// public async createEmpty(options?: SaveOptions): Promise<Policy> {
	// 	const policy = new Policy()
	// 	policy.categories = []
	// 	policy.legislationEvents = []
	// 	policy.entities = []
	// 	policy.title = ''
	// 	policy.description = ''
	// 	return this.policyRepository.save(policy, options)
	// }

	public async create(
		{
			categories,
			description,
			legislationEvents,
			namedEntities,
			title,
		}: CreatePolicyInput,
		saveOptions?: SaveOptions
	): Promise<Policy> {
		const policy = new Policy()

		policy.title = title
		policy.description = title

		const addProperty = async <T>(
			propertyName: string,
			input: T[] | string[] | undefined,
			repository: Repository<T>
		) => {
			if (input === undefined) policy[propertyName] = []
			else {
				policy[propertyName] = await getCollection(input, repository).catch(
					(err) => {
						throw err
					}
				)
			}
		}

		await Promise.allSettled(
			([
				[
					'legislationEvents',
					legislationEvents,
					this.legislationEventRepository,
				],
				['entities', namedEntities, this.namedEntityRepository],
				['categories', categories, this.categoryRepository],
			] as any).map(([propertyName, input, repository]) =>
				addProperty(propertyName, input, repository)
			)
		)

		await this.policyRepository.save(policy, saveOptions)

		return policy
	}
}
