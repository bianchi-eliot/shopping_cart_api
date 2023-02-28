import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addItem,
	deleteItem,
	getItems,
	getItem,
	updateItem,
} from './controllers.ts'

const router = new Router()

router.get('/items', getItems)

router.get('/items/:itemId', getItem)

router.post('/items', addItem)

router.put('/items/:itemId', updateItem)

router.delete('/items/:itemId', deleteItem)

export default router
