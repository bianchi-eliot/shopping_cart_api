import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import ItemTypesClass from './models.ts'
import { ItemTypes } from '../../types/index.ts'

export type RContext = RouterContext<
	'/item-types/:itemTypeId',
	{ itemTypeId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getAllItemTypes(ctx: Context) {
	try {
		const itemTypes: ItemTypes[] = await ItemTypesClass.getAllItemTypes()
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

export async function getSingleItemTypes(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		const itemType: ItemTypes[] = await ItemTypesClass.getSingleItemTypes(
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

export async function addItemTypes(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const name = value.name
		const result = await ItemTypesClass.addItemTypes(name)
		ctx.response.status = Status.Created
		ctx.response.body = { item_type_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateItemTypes(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		const body = ctx.request.body()
		const value = await body.value
		const name = value.name
		await ItemTypesClass.updateItemTypes(item_type_id, name)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteItemTypes(ctx: RContext) {
	try {
		const item_type_id = parseInt(ctx.params.itemTypeId)
		await ItemTypesClass.deleteItemTypes(item_type_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
