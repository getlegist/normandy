import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'

@Module({
	exports: [],
	providers: [],
	imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
