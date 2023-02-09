import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import UsersClass from './models.ts'
import { Users } from '../../types/index.ts'

type RContext = RouterContext<
	'/users/:id',
	{ id: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getAllUsers(ctx: Context) {
	try {
		const users: Users[] = await UsersClass.getAllUsers()
		if (users.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = users
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function getSingleUsers(ctx: RContext) {
	try {
		const id = parseInt(ctx.params.id)
		const user: Users[] = await UsersClass.getSingleUsers(id)
		if (user.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = user[0]
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function addUsers(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { firstname, lastname, email, password } = value
		const result = await UsersClass.addUsers(
			firstname,
			lastname,
			email,
			password,
		)
		ctx.response.status = Status.Created
		ctx.response.body = {
			id: result.lastInsertId,
			firstname,
			lastname,
			email,
			password,
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateUsers(ctx: RContext) {
	try {
		const id = parseInt(ctx.params.id)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { firstname, lastname, email } = value
		await UsersClass.updateUsers(id, firstname, lastname, email)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateUsersPassword(ctx: RContext) {
	try {
		const id = parseInt(ctx.params.id)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { former_password, new_password } = value
		const result = await UsersClass.updateUsersPassword(
			id,
			former_password,
			new_password,
		)
		if (result.affectedRows === 0) {
			ctx.response.status = Status.BadRequest
		} else {
			ctx.response.status = Status.NoContent
		}
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function deleteUsers(ctx: RContext) {
	try {
		const id = parseInt(ctx.params.id)
		await UsersClass.deleteUsers(id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
