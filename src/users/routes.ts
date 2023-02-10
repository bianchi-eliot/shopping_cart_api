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

router.get('/users/:userId', getSingleUsers)

router.post('/users', addUsers)

router.put('/users/:userId', updateUsers)

router.patch('/users/:userId', updateUsersPassword)

router.delete('/users/:userId', deleteUsers)

export default router
