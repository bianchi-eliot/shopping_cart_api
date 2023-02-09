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

router.get('/items/:id', getSingleItems)

router.post('/items', addItems)

router.put('/items/:id', updateItems)

router.delete('/items/:id', deleteItems)

export default router
