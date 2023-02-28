import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addCartItem,
	deleteCartItem,
	getCartItems,
	updateCartItemQuantity,
} from './controllers.ts'

const router = new Router()

router.get('/cart-items/:cartId', getCartItems)

router.post('/cart-items', addCartItem)

router.patch('/cart-items/:cartId/:itemId', updateCartItemQuantity)

router.delete('/cart-items/:cartId/:itemId', deleteCartItem)

export default router
