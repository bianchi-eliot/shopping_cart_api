import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import Carts from './models.ts'
import { Cart } from '../../types/index.ts'

export type RContext = RouterContext<
	'/carts/:cartId',
	{ cartId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export type RContext2 = RouterContext<
	'/carts/:userId',
	{ userId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getCarts(ctx: Context) {
	try {
		const carts: Cart[] = await Carts.getCarts()
		if (carts.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = carts
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function getCart(ctx: RContext2) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const cart: Cart[] = await Carts.getCart(user_id)
		if (cart.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = cart
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function addCart(ctx: Context) {
	try {
		const body = ctx.request.body()
		const value = await body.value
		const user_id = value.user_id
		const result = await Carts.addCart(user_id)
		ctx.response.status = Status.Created
		ctx.response.body = { cart_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteCart(ctx: RContext) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		await Carts.deleteCart(cart_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
