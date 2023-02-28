import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addItemType,
	deleteItemType,
	getItemTypes,
	getItemType,
	updateItemType,
} from './controllers.ts'

const router = new Router()

router.get('/item-types', getItemTypes)

router.get('/item-types/:itemTypeId', getItemType)

router.post('/item-types', addItemType)

router.put('/item-types/:itemTypeId', updateItemType)

router.delete('/item-types/:itemTypeId', deleteItemType)

export default router
