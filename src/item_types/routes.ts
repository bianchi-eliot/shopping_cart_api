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

router.get('/item-types/:id', getSingleItemTypes)

router.post('/item-types', addItemTypes)

router.put('/item-types/:id', updateItemTypes)

router.delete('/item-types/:id', deleteItemTypes)

export default router
