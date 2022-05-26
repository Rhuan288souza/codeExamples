import knex from '../database/knexfile'

exports.getAddresses = () => knex.select().table('enderecos')
exports.getAddress = (id: number) => knex.where({ id }).table('enderecos')

exports.deleteAddress = (id: number) => {
	return knex.where({ id }).delete().table('enderecos')
		.then(data => data === 0 ? 'Endereço não deletado' : 'Endereço deletado')
		.catch(error => error)
}

exports.postAddress = (address) => {
	return knex.insert({ ...address }).into('enderecos')
		.then(data => address)
		.catch(error => error)
}

exports.updateAddress = (address) => {
	return knex.where({ id: address.id }).update({ ...address }).table('enderecos')
		.then(data => data)
		.catch(error => error)
}
