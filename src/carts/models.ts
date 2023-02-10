import db from '../../helpers/db.ts'
import { Carts } from '../../types/index.ts'

class CartsClass {
	static async getAllCarts() {
		const carts: Carts[] = await db.query(
			`SELECT cart_id, user_id FROM carts`,
		)
		return carts
	}

	static async getSingleCarts(user_id: number) {
		const cart: Carts[] = await db.query(
			`SELECT cart_id FROM carts WHERE user_id = ?`,
			[user_id],
		)
		return cart
	}

	static async addCarts(user_id: number) {
		const result = await db.execute(
			`INSERT INTO carts(cart_id, user_id) VALUES(DEFAULT, ?)`,
			[user_id],
		)
		return result
	}

	static async deleteCarts(cart_id: number) {
		await db.execute(
			`DELETE FROM carts WHERE cart_id = ?`,
			[cart_id],
		)
	}
}

export default CartsClass
