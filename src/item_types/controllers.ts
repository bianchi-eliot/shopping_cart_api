import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import ItemTypes from './models.ts'
import { ItemType } from '../../types/index.ts'

export type RContext = RouterContext<
	'/item-types/:itemTypeId',
	{ itemTypeId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getItemTypes(ctx: Context) {
	try {
		const itemTypes: ItemType[] = await ItemTypes.getItemTypes()
		if (itemTypes.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = itemTypes
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function getItemType(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		const itemType: ItemType[] = await ItemTypes.getItemType(
			item_type_id,
		)
		if (itemType.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = itemType[0]
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function addItemType(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const name = value.name
		const result = await ItemTypes.addItemType(name)
		ctx.response.status = Status.Created
		ctx.response.body = { item_type_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateItemType(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		const body = ctx.request.body()
		const value = await body.value
		const name = value.name
		await ItemTypes.updateItemType(item_type_id, name)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteItemType(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		await ItemTypes.deleteItemType(item_type_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
