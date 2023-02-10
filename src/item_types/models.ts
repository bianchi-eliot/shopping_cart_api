import db from '../../helpers/db.ts'
import { ItemTypes } from '../../types/index.ts'

class ItemTypesClass {
	static async getAllItemTypes() {
		const itemTypes: ItemTypes[] = await db.query(
			`SELECT item_type_id, name FROM item_types`,
		)
		return itemTypes
	}

	static async getSingleItemTypes(item_type_id: number) {
		const itemType: ItemTypes[] = await db.query(
			`SELECT item_type_id, name FROM item_types WHERE item_type_id = ?`,
			[item_type_id],
		)
		return itemType
	}

	static async addItemTypes(name: string) {
		const result = await db.execute(
			`INSERT INTO item_types(item_type_id, name) VALUES(DEFAULT, ?)`,
			[name],
		)
		return result
	}

	static async updateItemTypes(item_type_id: number, name: string) {
		await db.execute(
			`UPDATE item_types SET name = ? WHERE item_type_id = ?`,
			[name, item_type_id],
		)
	}

	static async deleteItemTypes(item_type_id: number) {
		await db.execute(
			`DELETE FROM item_types WHERE item_type_id = ?`,
			[item_type_id],
		)
	}
}

export default ItemTypesClass
