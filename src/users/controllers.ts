import {
	Context,
	RouterContext,
	Status,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import Users from './models.ts'
import { User } from '../../types/index.ts'

type RContext = RouterContext<
	'/users/:userId',
	{ userId: string } & Record<string | number, string | undefined>,
	Record<string, unknown>
>

export async function getUsers(ctx: Context) {
	try {
		const users: User[] = await Users.getUsers()
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

export async function getUser(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const user: User[] = await Users.getUser(user_id)
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

export async function addUser(ctx: Context) {
	try {
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { firstname, lastname, email, password } = value
		const result = await Users.addUser(
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

export async function updateUser(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { firstname, lastname, email } = value
		await Users.updateUser(user_id, firstname, lastname, email)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}

export async function updateUserPassword(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		const bodyReq = ctx.request.body()
		const value = await bodyReq.value
		const { former_password, new_password } = value
		const result = await Users.updateUserPassword(
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

export async function deleteUser(ctx: RContext) {
	try {
		const user_id = parseInt(ctx.params.userId)
		await Users.deleteUser(user_id)
		ctx.response.status = Status.NoContent
	} catch (err) {
		console.log(`Error : ${err}`)
		ctx.response.status = Status.InternalServerError
	}
}
