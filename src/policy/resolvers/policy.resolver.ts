import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Policy } from '../policy'
import { PolicyService } from '../service/policy.service'
import { BaseEntityResolver } from '../../shared/graphql'
import { CreatePolicyInput } from './inputs/CreatePolicy.input'

@Resolver()
export class PolicyResolver extends BaseEntityResolver(Policy) {
	constructor(private policyService: PolicyService) {
		super(policyService)
	}

	@Mutation(() => Policy)
	async createEmptyPolicy() {
		return this.policyService.createEmpty()
	}

	@Mutation(() => Policy)
	async createPolicy(@Args('policy') input: CreatePolicyInput) {
		return this.policyService.create(input)
	}
}
