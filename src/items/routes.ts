import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addItems,
	deleteItems,
	getAllItems,
	getSingleItems,
	updateItems,
} from './controllers.ts'

const router = new Router()

router.get('/items', getAllItems)

router.get('/items/:itemId', getSingleItems)

router.post('/items', addItems)

router.put('/items/:itemId', updateItems)

router.delete('/items/:itemId', deleteItems)

export default router
