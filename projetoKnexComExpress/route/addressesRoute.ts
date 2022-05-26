import express from 'express'

require('dotenv').config('.env.local')
const router = express.Router()
const addressService = require('../service/addressesService')

router.get('/addresses', async (req, res) => {
	const addresses = await addressService.getAddresses()
	res.json(addresses)
})

router.get('/addresses/:id', async (req, res) => {
	const address = await addressService.getAddress(req.params.id)
	res.json(address)
})

router.post('/addresses', async (req, res) => {
	const address = req.body
	const addressRes = await addressService.postAddress(address)
	res.json(addressRes)
})

router.put('/addresses/:id', async (req, res) => {
	const address = req.body
	address.id = req.params.id
	const addressRes = await addressService.updateAddress(address)
	res.json(addressRes)
})

router.delete('/addresses/:id', async (req, res) => {
	const id = req.params.id
	const addressRes = await addressService.deleteAddress(id)
	res.json(addressRes)
})

module.exports = router