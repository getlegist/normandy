import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { Policy } from '../policy'
import { PolicyService } from '../service/policy.service'
import { BaseEntityResolver } from '../../shared/graphql'

@Resolver()
export class PolicyResolver extends BaseEntityResolver(Policy) {
	constructor(private policyService: PolicyService) {
		super(policyService)
	}
}
