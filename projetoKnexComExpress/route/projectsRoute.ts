import express from 'express'

require('dotenv').config('.env')
const router = express.Router()
const projectsService = require('../service/projectsService')

router.get('/projects', async (req, res) => {
	const projects = await projectsService.getprojects()
	res.json(projects)
})

router.get('/projects/:id', async (req, res) => {
	const project = await projectsService.getProject(req.params.id)
	res.json(project)
})

router.post('/projects', async (req, res) => {
	const project = req.body
	const projectRes = await projectsService.postProject(project)
	res.json(projectRes)
})

router.put('/projects/:id', async (req, res) => {
	const project = req.body
	project.id = req.params.id
	const projectRes = await projectsService.updateProject(project)
	res.json(projectRes)
})

router.delete('/projects/:id', async (req, res) => {
	const id = req.params.id
	const projectRes = await projectsService.deleteProject(id)
	res.json(projectRes)
})

module.exports = router