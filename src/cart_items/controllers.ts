import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import CartItemsClass from './models.ts'
import { CartItems } from '../../types/index.ts'

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

export async function getAllCartItems(ctx: RContext) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const cartItems: CartItems[] = await CartItemsClass.getAllCartItems(cart_id)
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

export async function addCartItems(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { cart_id, item_id, quantity } = value
		await CartItemsClass.addCartItems(cart_id, item_id, quantity)
		ctx.response.status = Status.Created
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateCartItemsQuantity(ctx: RContext2) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const item_id = parseInt(ctx.params.itemId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { quantity } = value
		await CartItemsClass.updateCartItemsQuantity(cart_id, item_id, quantity)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteCartItems(ctx: RContext2) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		const item_id = parseInt(ctx.params.itemId)
		await CartItemsClass.deleteCartItems(cart_id, item_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
