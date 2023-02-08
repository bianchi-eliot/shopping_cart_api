import db from '../../helpers/db.ts'
import { ItemTypes } from '../../types/index.ts'

class ItemTypesClass {
	static async getAllItemTypes() {
		const itemTypes: ItemTypes[] = await db.query(
			'SELECT item_type_id, name FROM item_types',
		)
		return itemTypes
	}

	static async getSingleItemTypes(id: number) {
		const itemType: ItemTypes[] = await db.query(
			'SELECT item_type_id, name FROM item_types WHERE item_type_id = ?',
			[id],
		)
		return itemType
	}

	static async addItemTypes(name: string) {
		const result = await db.execute(
			'INSERT INTO item_types(name) values(?)',
			[name],
		)
		return result
	}

	static async updateItemTypes(id: number, name: string) {
		await db.execute(
			'UPDATE item_types SET name = ? WHERE item_type_id = ?',
			[name, id]
		)
	}
	
	static async deleteItemTypes(id: number) {
		await db.execute(
			'DELETE FROM item_types WHERE item_type_id = ?',
			[id]
		)
	}
}

export default ItemTypesClass
