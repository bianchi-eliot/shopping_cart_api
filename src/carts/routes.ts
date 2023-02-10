import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addCarts,
	deleteCarts,
	getAllCarts,
	getSingleCarts,
} from './controllers.ts'

const router = new Router()

router.get('/carts', getAllCarts)

router.get('/carts/:userId', getSingleCarts)

router.post('/carts', addCarts)

router.delete('/carts/:cartId', deleteCarts)

export default router
