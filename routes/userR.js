import { Router } from 'express'
export const router = Router()
import * as userC from '../controllers/userC.js'

router.post('/signup', (req, res) => {
	userC.addUser(req)
	.then(() => res.sendStatus(200))
	.catch(e => res.status(400).json(e))
})

router.post('/signin', (req, res) => {
	userC.getUser(req)
	.then(r => r ? res.sendStatus(200) : res.sendStatus(400))
	.catch(e => res.status(400).json(e))
})

// router.delete('/delete', (req, res) => {
// 	userC.deleteUser(req)
// 	.then(data => res.status(200).json(data))
// 	.catch(e => res.status(400).json(e))
// })