import db from '../../helpers/db.ts'
import { Item } from '../../types/index.ts'

class Items {
	static async getItems() {
		const items: Item[] = await db.query(
			`SELECT item_id, items.name, price, quantity, image_url, 
        item_types.name AS item_type_name FROM items
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id`,
		)
		return items
	}

	static async getItem(item_id: number) {
		const item: Item[] = await db.query(
			`SELECT item_id, items.name, price, quantity, image_url, 
        item_types.name AS item_type_name FROM items
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id
       WHERE item_id = ?`,
			[item_id],
		)
		return item
	}

	static async addItem(
		name: string,
		price: string,
		quantity: number,
		image_url: string,
		item_type_id: number,
	) {
		const result = await db.execute(
			`INSERT INTO items(item_id, name, price, quantity, image_url, item_type_id) 
			 VALUES(DEFAULT, ?, ?, ?, ?, ?)`,
			[name, price, quantity, image_url, item_type_id],
		)
		return result
	}

	static async updateItem(
		item_id: number,
		name: string,
		price: number,
		quantity: number,
		image_url: string,
		item_type_id: number,
	) {
		await db.execute(
			`UPDATE items SET name = ?, price = ?, quantity = ?, image_url = ?, item_type_id = ?
				 WHERE item_id = ?`,
			[name, price, quantity, image_url, item_type_id, item_id],
		)
	}

	static async deleteItem(item_id: number) {
		await db.execute(
			`DELETE FROM items WHERE item_id = ?`,
			[item_id],
		)
	}
}

export default Items
