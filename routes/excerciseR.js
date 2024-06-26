import { Router } from 'express'
import { isAuthenticated } from '../controllers/userAuth.js'
import * as excerciseC from '../controllers/excerciseC.js'
export const router = Router()

router.post('/add', isAuthenticated, (req, res) => {
	excerciseC.addExcercise(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.get('', (req, res) => {
	excerciseC.getAllExcercises()
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.get('/muscles', (req, res) => {
	excerciseC.getExcerciseMuscles()
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.get('/:excercise', (req, res) => {
	excerciseC.getExcercise(req.params.excercise)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.post('/notes/:excercise', isAuthenticated, (req, res) => {
	excerciseC.addExcerciseNotes(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.delete('/notes/:excercise/:index', isAuthenticated, (req, res) => {
	excerciseC.deleteExcerciseNote(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})


router.delete('/:excercise', isAuthenticated, (req, res) => {
	excerciseC.deleteExcercise(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})