import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import {
	addUser,
	deleteUser,
	getUsers,
	getUser,
	updateUser,
	updateUserPassword,
} from './controllers.ts'

const router = new Router()

router.get('/users', getUsers)

router.get('/users/:userId', getUser)

router.post('/users', addUser)

router.put('/users/:userId', updateUser)

router.patch('/users/:userId', updateUserPassword)

router.delete('/users/:userId', deleteUser)

export default router
