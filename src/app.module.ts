import { Global, Module } from '@nestjs/common'
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
import { PolicyModule } from './policy/policy.module'
import { CategoryModule } from './category/category.module'
import { LegislationEventModule } from './events/legislation/legislation-event.module'
import { IndexModule } from './index/index.module'
import { NamedEntityModule } from './entities/named-entity.module'

export const AppModule = (dbURL: string): any => {
	@Global()
	@Module({
		imports: [
			UserModule,
			TypeOrmModule.forRoot({
				type: 'postgres',
				url: dbURL,
				entities: [
					User,
					Policy,
					Index,
					LegislationEvent,
					NamedEntity,
					Category,
				],
				synchronize: true,
			}),
			GraphQLModule.forRoot({
				playground: true,

				introspection: true,
				autoSchemaFile: join(process.cwd() + 'src/schema.gql'),
				sortSchema: true,
			}),
			PolicyModule,
			CategoryModule,
			LegislationEventModule,
			IndexModule,
			NamedEntityModule,
		],
		controllers: [],
		providers: [],
	})
	abstract class BaseAppModule {}

	return BaseAppModule
}
