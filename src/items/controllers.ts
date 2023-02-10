import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import ItemTypesClass from '../item_types/models.ts'
import ItemsClass from './models.ts'
import { Items, ItemTypes } from '../../types/index.ts'

type RContext = RouterContext<
	'/items/:itemId',
	{ itemId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getAllItems(ctx: Context) {
	try {
		const items: Items[] = await ItemsClass.getAllItems()
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

export async function getSingleItems(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		const item: Items[] = await ItemsClass.getSingleItems(item_id)
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

export async function addItems(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { name, quantity, image_url, item_type_id } = value

		const itemType: ItemTypes[] = await ItemTypesClass.getSingleItemTypes(
			item_type_id,
		)
		if (itemType.length === 0) {
			return ctx.response.status = Status.BadRequest
		}
		const result = await ItemsClass.addItems(
			name,
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

export async function updateItems(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { name, quantity, image_url, item_type_id } = value

		const itemType: ItemTypes[] = await ItemTypesClass.getSingleItemTypes(
			item_type_id,
		)
		if (itemType.length === 0) {
			return ctx.response.status = Status.BadRequest
		}
		await ItemsClass.updateItems(
			item_id,
			name,
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

export async function deleteItems(ctx: RContext) {
	try {
		const item_id = parseInt(ctx.params.itemId)
		await ItemsClass.deleteItems(item_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
