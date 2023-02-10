import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addItemTypes,
	deleteItemTypes,
	getAllItemTypes,
	getSingleItemTypes,
	updateItemTypes,
} from './controllers.ts'

const router = new Router()

router.get('/item-types', getAllItemTypes)

router.get('/item-types/:itemTypeId', getSingleItemTypes)

router.post('/item-types', addItemTypes)

router.put('/item-types/:itemTypeId', updateItemTypes)

router.delete('/item-types/:itemTypeId', deleteItemTypes)

export default router
