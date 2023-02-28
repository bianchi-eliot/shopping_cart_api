import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import CartItems from './models.ts'
import { CartItem } from '../../types/index.ts'

export type RContext = RouterContext<
	'/cart-items/:cartId',
	& { cartId: string; itemId: string }
	& Record<string | number, string | undefined>,
	Record<string, unknown>
>

export type RContext2 = RouterContext<
	'/cart-items/:cartId/:itemId',
	& { cartId: string; itemId: string }
	& Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getCartItems(ctx: RContext) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const cartItems: CartItem[] = await CartItems.getCartItems(cart_id)
		if (cartItems.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = cartItems
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function addCartItem(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { cart_id, item_id, quantity } = value
		await CartItems.addCartItem(cart_id, item_id, quantity)
		ctx.response.status = Status.Created
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateCartItemQuantity(ctx: RContext2) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const item_id = parseInt(ctx.params.itemId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { quantity } = value
		await CartItems.updateCartItemQuantity(cart_id, item_id, quantity)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteCartItem(ctx: RContext2) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const item_id = parseInt(ctx.params.itemId)
		await CartItems.deleteCartItem(cart_id, item_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
