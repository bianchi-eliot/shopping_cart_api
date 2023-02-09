import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addUsers,
	deleteUsers,
	getAllUsers,
	getSingleUsers,
	updateUsers,
	updateUsersPassword,
} from './controllers.ts'

const router = new Router()

router.get('/users', getAllUsers)

router.get('/users/:id', getSingleUsers)

router.post('/users', addUsers)

router.put('/users/:id', updateUsers)

router.patch('/users/:id', updateUsersPassword)

router.delete('/users/:id', deleteUsers)

export default router
