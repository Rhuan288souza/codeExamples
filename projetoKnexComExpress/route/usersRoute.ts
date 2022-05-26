import express from 'express'

require('dotenv').config('.env')
const router = express.Router()
const usersService = require('../service/usersService')

router.get('/users', async (req, res) => {
	const users = await usersService.getUsers()
	res.json(users)
})

router.get('/users/:id', async (req, res) => {
	const user = await usersService.getUser(req.params.id)
	res.json(user)
})

router.post('/users', async (req, res) => {
	const user = req.body
	const userRes = await usersService.postUser(user)
	res.json(userRes)
})

router.put('/users/:id', async (req, res) => {
	const user = req.body
	user.id = req.params.id
	const userRes = await usersService.updateUser(user)
	res.json(userRes)
})


router.delete('/users/:id', async (req, res) => {
	const id = req.params.id
	const userRes = await usersService.deleteUser(id)
	res.json(userRes)
})

module.exports = router