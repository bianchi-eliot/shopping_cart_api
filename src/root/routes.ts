import { Context, Router, Status } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import db from '../../helpers/db.ts'

const router = new Router()

router.get('/', async (ctx: Context) => {
	try {
		ctx.response.status = Status.OK
		await db.connect()
		await db.end()
		ctx.response.body = 'Hello World'
	} catch (err) {
		console.log('Error : ', err)
		ctx.response.status = Status.InternalServerError
		ctx.response.body = 'Something went wrong'
	}
})

router.get('/(.*)', (ctx: Context) => {
	ctx.response.status = Status.NotFound
	ctx.response.body = '404 | Page not found'
})

export default router
