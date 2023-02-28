import db from '../../helpers/db.ts'
import { User } from '../../types/index.ts'

class Users {
	static async getUsers() {
		const users: User[] = await db.query(
			`SELECT user_id, firstname FROM users`,
		)
		return users
	}

	static async getUser(user_id: number) {
		const user: User[] = await db.query(
			`SELECT user_id, firstname, lastname, email FROM users
       WHERE user_id = ?`,
			[user_id],
		)
		return user
	}

	static async addUser(
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

	static async updateUser(
		user_id: number,
		firstname: string,
		lastname: string,
		email: string,
	) {
		await db.execute(
			`UPDATE users SET firstname = ?, lastname = ?, email = ?
       WHERE user_id = ?`,
			[firstname, lastname, email, user_id],
		)
	}

	static async updateUserPassword(
		user_id: number,
		former_password: string,
		new_password: string,
	) {
		const result = await db.execute(
			`UPDATE users SET password = ?
       WHERE user_id = ? AND password = ?`,
			[new_password, user_id, former_password],
		)
		return result
	}

	static async deleteUser(user_id: number) {
		await db.execute(
			`DELETE FROM users WHERE user_id = ?`,
			[user_id],
		)
	}
}

export default Users
