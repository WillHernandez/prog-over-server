import { Router } from 'express'
export const router = Router()
import * as excerciseC from '../controllers/excerciseC.js'

router.post('', (req, res) => {
	excerciseC.addExcercise(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.get('', async (req, res) => {
	try {
		const data = await excerciseC.getAllExcercises()	
		res.status(200).json(data)
	} catch(e) {
		res.status(400).json(e.message)
	}
})

router.get('/muscles', async (req, res) => {
	try {
		const data = await excerciseC.getExcerciseMuscles()	
		res.status(200).json(data)
	} catch(e) {
		res.status(400).json(e.message)
	}	
})

router.get('/:excercise', (req, res) => {
	excerciseC.getExcercise(req.params.excercise)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.post('/notes/:excercise', (req, res) => {
	excerciseC.addExcerciseNotes(req)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.delete('/:excercise', (req, res) => {
	excerciseC.deleteExcercise(req.params.excercise)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})