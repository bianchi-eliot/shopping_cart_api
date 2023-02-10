import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import CartsClass from './models.ts'
import { Carts } from '../../types/index.ts'

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

export async function getAllCarts(ctx: Context) {
	try {
		const carts: Carts[] = await CartsClass.getAllCarts()
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

export async function getSingleCarts(ctx: RContext2) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const cart: Carts[] = await CartsClass.getSingleCarts(user_id)
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

export async function addCarts(ctx: Context) {
	try {
		const body = ctx.request.body()
		const value = await body.value
		const user_id = value.user_id
		const result = await CartsClass.addCarts(user_id)
		ctx.response.status = Status.Created
		ctx.response.body = { cart_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteCarts(ctx: RContext) {
	try {
		const cart_id = parseInt(ctx.params.cartId)
		await CartsClass.deleteCarts(cart_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
