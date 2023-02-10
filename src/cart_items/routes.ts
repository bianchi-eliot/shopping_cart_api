import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addCartItems,
	deleteCartItems,
	getAllCartItems,
	updateCartItemsQuantity,
} from './controllers.ts'

const router = new Router()

router.get('/cart-items/:cartId', getAllCartItems)

router.post('/cart-items', addCartItems)

router.patch('/cart-items/:cartId/:itemId', updateCartItemsQuantity)

router.delete('/cart-items/:cartId/:itemId', deleteCartItems)

export default router
