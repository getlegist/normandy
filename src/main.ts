import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export class Normandy {
	public static async bootstrap(port?: number) {
		const app = await NestFactory.create(AppModule)
		await app.listen(port ?? 3000)
	}
}

;(async () => {
	await Normandy.bootstrap()
})()
