const recordsData = require('../data/recordsData')

exports.getRecords = () => recordsData.getRecords()
exports.getRecord = (id) => recordsData.getRecord(id)
exports.deleteRecord = (id) => recordsData.deleteRecord(id)
exports.postRecord = (record) => recordsData.postRecord(record)
exports.updateRecord = (record) => recordsData.updateRecord(record)
