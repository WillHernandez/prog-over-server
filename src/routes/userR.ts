import { Router } from 'express'
export const router = Router()
import * as userC from '../controllers/userC.js'

router.post('/signup', (req, res) => {
	userC.addUser(req.body)
	.then(() => res.sendStatus(200))
	.catch(e => res.status(400).json(e))
})

router.post('/signin', async (req, res) => {
	return await userC.getUser(req, res)
})

router.get('/signout', (req, res) => {
	return userC.signOut(req, res)
})

// router.delete('/delete', (req, res) => {
// 	userC.deleteUser(req)
// 	.then(data => res.status(200).json(data))
// 	.catch(e => res.status(400).json(e))
// })