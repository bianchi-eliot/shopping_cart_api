import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import UsersClass from './models.ts'
import { Users } from '../../types/index.ts'

type RContext = RouterContext<
	'/users/:userId',
	{ userId: string } & Record<string | number, string | undefined>,
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
		const user_id = parseInt(ctx.params.userId)
		const user: Users[] = await UsersClass.getSingleUsers(user_id)
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
		ctx.response.body = { user_id: result.lastInsertId }
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateUsers(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { firstname, lastname, email } = value
		await UsersClass.updateUsers(user_id, firstname, lastname, email)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateUsersPassword(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { former_password, new_password } = value
		const result = await UsersClass.updateUsersPassword(
			user_id,
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
		const user_id = parseInt(ctx.params.userId)
		await UsersClass.deleteUsers(user_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
