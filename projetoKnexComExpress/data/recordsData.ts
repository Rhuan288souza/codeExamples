import knex from '../database/knexfile'

exports.getRecords = () => knex.select().table('ata')
exports.getRecor = (id: number) => knex.where({ id }).table('ata')

exports.deleteRecor = (id: number) => {
	return knex.where({ id }).delete().table('ata')
		.then(data => data === 0 ? 'Ata não deletada' : 'Ata deletada')
		.catch(error => error)
}

exports.postRecor = (record) => {
	return knex.insert({ ...record }).into('ata')
		.then(data => record)
		.catch(error => error)
}

exports.updateRecor = (record) => {
	return knex.where({ id: record.id }).update({ ...record }).table('ata')
		.then(data => data)
		.catch(error => error)
}
