import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addCart,
	deleteCart,
	getCarts,
	getCart,
} from './controllers.ts'

const router = new Router()

router.get('/carts', getCarts)

router.get('/carts/:userId', getCart)

router.post('/carts', addCart)

router.delete('/carts/:cartId', deleteCart)

export default router
