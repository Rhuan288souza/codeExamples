import knex from '../database/knexfile'

exports.getUsers = () => knex.select().table('usuarios')
exports.getUser = (id: number) => knex.where({ id }).table('usuarios')

exports.deleteUser = (id: number) => {
	return knex.where({ id }).delete().table('usuarios')
		.then(data => data === 0 ? 'Usuário não deletado' : 'Usuário deletado')
		.catch(error => error)
}

exports.postUser = (user) => {
	return knex.insert({ ...user }).into('usuarios')
		.then(data => user)
		.catch(error => error)
}

exports.updateUser = (user) => {
	return knex.where({ id: user.id }).update({ ...user }).table('usuarios')
		.then(data => data)
		.catch(error => error)
}
