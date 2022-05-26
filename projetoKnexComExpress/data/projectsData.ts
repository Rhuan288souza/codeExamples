import knex from '../database/knexfile'

exports.getProjects = () => knex.select().table('projetos')
exports.getProject = (id: number) => knex.where({ id }).table('projetos')

exports.deleteProject = (id: number) => {
	return knex.where({ id }).delete().table('projetos')
		.then(data => data === 0 ? 'Projeto não deletado' : 'Projeto deletado')
		.catch(error => error)
}

exports.postProject = (project) => {
	return knex.insert({ ...project }).into('projetos')
		.then(data => project)
		.catch(error => error)
}

exports.updateProject = (project) => {
	return knex.where({ id: project.id }).update({ ...project }).table('projetos')
		.then(data => data)
		.catch(error => error)
}
