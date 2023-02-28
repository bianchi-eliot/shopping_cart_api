import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import ItemTypes from '../item_types/models.ts'
import Items from './models.ts'
import { Item, ItemType } from '../../types/index.ts'

type RContext = RouterContext<
	'/items/:itemId',
	{ itemId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getItems(ctx: Context) {
	try {
		const items: Item[] = await Items.getItems()
		if (items.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = items
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function getItem(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		const item: Item[] = await Items.getItem(item_id)
		if (item.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = item[0]
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function addItem(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { name, price, quantity, image_url, item_type_id } = value

		const itemType: ItemType[] = await ItemTypes.getItemType(
			item_type_id,
		)
		if (itemType.length === 0) {
			return ctx.response.status = Status.BadRequest
		}
		const result = await Items.addItem(
			name,
			price,
			quantity,
			image_url,
			item_type_id,
		)
		ctx.response.status = Status.Created
		ctx.response.body = { item_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateItem(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { name, price, quantity, image_url, item_type_id } = value

		const itemType: ItemType[] = await ItemTypes.getItemType(
			item_type_id,
		)
		if (itemType.length === 0) {
			return ctx.response.status = Status.BadRequest
		}
		await Items.updateItem(
			item_id,
			name,
			price,
			quantity,
			image_url,
			item_type_id,
		)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteItem(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		await Items.deleteItem(item_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
