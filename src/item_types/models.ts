import db from '../../helpers/db.ts'
import { ItemType } from '../../types/index.ts'

class ItemTypes {
	static async getItemTypes() {
		const itemTypes: ItemType[] = await db.query(
			`SELECT item_type_id, name FROM item_types`,
		)
		return itemTypes
	}

	static async getItemType(item_type_id: number) {
		const itemType: ItemType[] = await db.query(
			`SELECT item_type_id, name FROM item_types WHERE item_type_id = ?`,
			[item_type_id],
		)
		return itemType
	}

	static async addItemType(name: string) {
		const result = await db.execute(
			`INSERT INTO item_types(item_type_id, name) VALUES(DEFAULT, ?)`,
			[name],
		)
		return result
	}

	static async updateItemType(item_type_id: number, name: string) {
		await db.execute(
			`UPDATE item_types SET name = ? WHERE item_type_id = ?`,
			[name, item_type_id],
		)
	}

	static async deleteItemType(item_type_id: number) {
		await db.execute(
			`DELETE FROM item_types WHERE item_type_id = ?`,
			[item_type_id],
		)
	}
}

export default ItemTypes
