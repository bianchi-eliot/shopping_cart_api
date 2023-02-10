import db from '../../helpers/db.ts'
import { Items } from '../../types/index.ts'

class ItemsClass {
	static async getAllItems() {
		const items: Items[] = await db.query(
			`SELECT item_id, items.name, quantity, image_url, 
        item_types.name AS item_type_name FROM items
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id`,
		)
		return items
	}

	static async getSingleItems(item_id: number) {
		const item: Items[] = await db.query(
			`SELECT item_id, items.name, quantity, image_url, 
        item_types.name AS item_type_name FROM items
       INNER JOIN item_types ON items.item_type_id = item_types.item_type_id
       WHERE item_id = ?`,
			[item_id],
		)
		return item
	}

	static async addItems(
		name: string,
		quantity: number,
		image_url: string,
		item_type_id: number,
	) {
		const result = await db.execute(
			`INSERT INTO items(item_id, name, quantity, image_url, item_type_id) 
			 VALUES(DEFAULT, ?, ?, ?, ?)`,
			[name, quantity, image_url, item_type_id],
		)
		return result
	}

	static async updateItems(
		item_id: number,
		name: string,
		quantity: number,
		image_url: string,
		item_type_id: number,
	) {
		await db.execute(
			`UPDATE items SET name = ?, quantity = ?, image_url = ?, item_type_id = ?
				 WHERE item_id = ?`,
			[name, quantity, image_url, item_type_id, item_id],
		)
	}

	static async deleteItems(item_id: number) {
		await db.execute(
			`DELETE FROM items WHERE item_id = ?`,
			[item_id],
		)
	}
}

export default ItemsClass
