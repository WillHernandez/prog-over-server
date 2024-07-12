import { Router } from 'express'
// import { isAuthenticated } from '../controllers/userAuth.js'
import * as excerciseC from '../controllers/excerciseC.js'
export const router = Router()


// router.post('/add', isAuthenticated, (req, res) => {
router.post('/add', (req, res) => {
	excerciseC.addExcercise(req.body.excercise)
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

router.get('/excercise/:category', (req, res) => {
	excerciseC.getExcerciseCategory(req.params.category)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.get('/:excercise', (req, res) => {
	excerciseC.getExcercise(req.params.excercise)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

router.post('/filter', (req, res) => {
	excerciseC.getExcercisesFilter(req.body.excercises)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

// router.post('/notes/:excercise', isAuthenticated, (req, res) => {
router.post('/notes/:excercise', (req, res) => {
	excerciseC.addExcerciseNotes(req.params.excercise, req.body.notes)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})

// router.delete('/notes/:excercise/:index', isAuthenticated, (req, res) => {
router.delete('/notes/:excercise/:index', (req, res) => {
	excerciseC.deleteExcerciseNote(req.params.excercise, req.params.index)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})


// router.delete('/:excercise', isAuthenticated, (req, res) => {
router.delete('/:excercise', (req, res) => {
	excerciseC.deleteExcercise(req.params.excercise)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(400).json(e.message))
})