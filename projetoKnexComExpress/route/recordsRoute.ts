import express from 'express'

require('dotenv').config('.env')
const router = express.Router()
const recordsService = require('../service/recordsService')

router.get('/records', async (req, res) => {
	const records = await recordsService.getRecords()
	res.json(records)
})

router.get('/records/:id', async (req, res) => {
	const record = await recordsService.getRecord(req.params.id)
	res.json(record)
})

router.post('/records', async (req, res) => {
	const record = req.body
	const recordRes = await recordsService.postRecord(record)
	res.json(recordRes)
})

router.put('/records/:id', async (req, res) => {
	const record = req.body
	record.id = req.params.id
	const recordRes = await recordsService.updateRecord(record)
	res.json(recordRes)
})

router.delete('/records/:id', async (req, res) => {
	const id = req.params.id
	const recordRes = await recordsService.deleteRecord(id)
	res.json(recordRes)
})

module.exports = router