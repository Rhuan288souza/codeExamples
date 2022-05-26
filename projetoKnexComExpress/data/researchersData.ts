import knex from '../database/knexfile'

exports.getResearchers = () => knex.select().table('pesquisadores')
exports.getResearcher = (id: number) => knex.where({ id }).table('pesquisadores')

exports.deleteResearcher = (id: number) => {
	return knex.where({ id }).delete().table('pesquisadores')
		.then(data => data === 0 ? 'Pesquisador não deletado' : 'Pesquisador deletado')
		.catch(error => error)
}

exports.postResearcher = (researcher) => {
	return knex.insert({ ...researcher }).into('pesquisadores')
		.then(data => researcher)
		.catch(error => error)
}

exports.updateResearcher = (researcher) => {
	return knex.where({ id: researcher.id }).update({ ...researcher }).table('pesquisadores')
		.then(data => data)
		.catch(error => error)
}
