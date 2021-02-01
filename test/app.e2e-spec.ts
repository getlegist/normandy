import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { config } from 'dotenv'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		config()
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule(process.env.db)],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Hello World!')
	})
})
