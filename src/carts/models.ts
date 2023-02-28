import db from '../../helpers/db.ts'
import { Cart } from '../../types/index.ts'

class Carts {
	static async getCarts() {
		const carts: Cart[] = await db.query(
			`SELECT cart_id, user_id FROM carts`,
		)
		return carts
	}

	static async getCart(user_id: number) {
		const cart: Cart[] = await db.query(
			`SELECT cart_id FROM carts WHERE user_id = ?`,
			[user_id],
		)
		return cart
	}

	static async addCart(user_id: number) {
		const result = await db.execute(
			`INSERT INTO carts(cart_id, user_id) VALUES(DEFAULT, ?)`,
			[user_id],
		)
		return result
	}

	static async deleteCart(cart_id: number) {
		await db.execute(
			`DELETE FROM carts WHERE cart_id = ?`,
			[cart_id],
		)
	}
}

export default Carts
