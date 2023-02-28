import db from '../../helpers/db.ts'
import { CartItem } from '../../types/index.ts'

class CartItems {
	static async getCartItems(cart_id: number) {
		const cartItems: CartItem[] = await db.query(
			`SELECT cart_items.quantity, items.name AS item_name, items.image_url,
				item_types.name AS item_type_name FROM cart_items
       INNER JOIN items ON cart_items.item_id = items.item_id
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id
       WHERE cart_id = ?`,
			[cart_id],
		)
		return cartItems
	}

	static async addCartItem(
		cart_id: number,
		item_id: number,
		quantity: number,
	) {
		await db.execute(
			`INSERT INTO cart_items(cart_id, item_id, quantity) VALUES(?, ?, ?)`,
			[cart_id, item_id, quantity],
		)
	}

	static async updateCartItemQuantity(
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

	static async deleteCartItem(cart_id: number, item_id: number) {
		await db.execute(
			`DELETE FROM cart_items WHERE cart_id = ? AND item_id = ?`,
			[cart_id, item_id],
		)
	}

	static async deleteCartItems(cart_id: number) {
		await db.execute(
			`DELETE FROM cart_items WHERE cart_id = ?`,
			[cart_id],
		)
	}
}

export default CartItems
