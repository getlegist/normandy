import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Policy } from '../policy'
import { PolicyService } from '../service/policy.service'
import { BaseEntityResolver } from '../../shared/graphql'
import { CreatePolicyInput } from './inputs/CreatePolicy.input'
import { UpdatePolicyInput } from './inputs/UpdatePolicy.input'

@Resolver()
export class PolicyResolver extends BaseEntityResolver(Policy) {
	constructor(private policyService: PolicyService) {
		super(policyService)
	}

	@Mutation(() => Policy)
	async createEmptyPolicy() {
		return this.policyService.createEmptyPolicy()
	}

	@Mutation(() => Policy)
	async createPolicy(@Args('policy') input: CreatePolicyInput) {
		return this.policyService.createPolicy(input)
	}

	@Mutation(() => Policy)
	async updateMergePolicy(
		@Args('id') id: string,
		@Args('policy') input: UpdatePolicyInput
	) {
		return this.policyService.updateMergePolicy(id, input)
	}

	@Mutation(() => Policy)
	async updatePolicy(
		@Args('id') id: string,
		@Args('policy') input: UpdatePolicyInput
	) {
		return this.policyService.updatePolicy(id, input)
	}
}
