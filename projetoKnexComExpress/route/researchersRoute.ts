import express from 'express'

require('dotenv').config('.env')
const router = express.Router()
const researchersService = require('../service/researchersService')

router.get('/researchers', async (req, res) => {
	const researchers = await researchersService.getResearchers()
	res.json(researchers)
})

router.get('/researchers/:id', async (req, res) => {
	const searcher = await researchersService.getResearch(req.params.id)
	res.json(searcher)
})

router.post('/researchers', async (req, res) => {
	const researcher = req.body
	const researchersRes = await researchersService.postResearch(researcher)
	res.json(researchersRes)
})

router.put('/researchers/:id', async (req, res) => {
	const researcher = req.body
	researcher.id = req.params.id
	const researchersRes = await researchersService.updateResearch(researcher)
	res.json(researchersRes)
})

router.delete('/researchers/:id', async (req, res) => {
	const id = req.params.id
	const researchersRes = await researchersService.deleteResearch(id)
	res.json(researchersRes)
})

module.exports = router