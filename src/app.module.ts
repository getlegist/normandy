import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user'
import { Policy } from './policy/policy'
import { Index } from './index'
import { LegislationEvent } from './events/legislation/legislation-event'
import { NamedEntity } from './entities/named-entity'
import { Category } from './category/category'

@Module({
	imports: [
		UserModule,
		GraphQLModule.forRoot({
			playground: true,
			introspection: true,
			autoSchemaFile: join(process.cwd() + 'src/schema.gql'),
			sortSchema: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: 'postgres://postgres@localhost:4445/postgres',
			entities: [User, Policy, Index, LegislationEvent, NamedEntity, Category],
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
