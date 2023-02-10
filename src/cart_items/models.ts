import db from '../../helpers/db.ts'
import { CartItems } from '../../types/index.ts'

class CartItemsClass {
	static async getAllCartItems(cart_id: number) {
		const cartItems: CartItems[] = await db.query(
			`SELECT cart_items.quantity, items.name AS item_name, items.image_url,
				item_types.name AS item_type_name FROM cart_items
       INNER JOIN items ON cart_items.item_id = items.item_id
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id
       WHERE cart_id = ?`,
			[cart_id],
		)
		return cartItems
	}

	static async addCartItems(
		cart_id: number,
		item_id: number,
		quantity: number,
	) {
		await db.execute(
			`INSERT INTO cart_items(cart_id, item_id, quantity) VALUES(?, ?, ?)`,
			[cart_id, item_id, quantity],
		)
	}

	static async updateCartItemsQuantity(
		cart_id: number,
		item_id: number,
		quantity: number,
	) {
		await db.execute(
			`UPDATE cart_items SET quantity = quantity + ?
       WHERE cart_id = ? AND item_id = ?`,
			[quantity, cart_id, item_id],
		)
	}

	static async deleteCartItems(cart_id: number, item_id: number) {
		await db.execute(
			`DELETE FROM cart_items WHERE cart_id = ? AND item_id = ?`,
			[cart_id, item_id],
		)
	}

	static async deleteAllCartItems(cart_id: number) {
		await db.execute(
			`DELETE FROM cart_items WHERE cart_id = ?`,
			[cart_id],
		)
	}
}

export default CartItemsClass
