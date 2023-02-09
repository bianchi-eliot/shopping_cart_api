import db from '../../helpers/db.ts'
import { Users } from '../../types/index.ts'

class UsersClass {
	static async getAllUsers() {
		const users: Users[] = await db.query(
			`SELECT user_id, firstname FROM users`,
		)
		return users
	}

	static async getSingleUsers(id: number) {
		const user: Users[] = await db.query(
			`SELECT user_id, firstname, lastname, email FROM users
       WHERE user_id = ?`,
			[id],
		)
		return user
	}

	static async addUsers(
		firstname: string,
		lastname: string,
		email: string,
		password: string,
	) {
		const result = await db.execute(
			`INSERT INTO users(user_id, firstname, lastname, email, password)
       VALUES(DEFAULT, ?, ?, ?, ?)`,
			[firstname, lastname, email, password],
		)
		return result
	}

	static async updateUsers(
		id: number,
		firstname: string,
		lastname: string,
		email: string,
	) {
		await db.execute(
			`UPDATE users SET firstname = ?, lastname = ?, email = ?
       WHERE user_id = ?`,
			[firstname, lastname, email, id],
		)
	}

	static async updateUsersPassword(
		id: number,
		former_password: string,
		new_password: string,
	) {
		const result = await db.execute(
			`UPDATE users SET password = ?
       WHERE user_id = ? AND password = ?`,
			[new_password, id, former_password],
		)
		return result
	}

	static async deleteUsers(id: number) {
		await db.execute(
			`DELETE FROM users WHERE user_id = ?`,
			[id],
		)
	}
}

export default UsersClass
