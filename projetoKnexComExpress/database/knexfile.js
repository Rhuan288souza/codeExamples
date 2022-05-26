const config = {
	client: 'postgresql',
	connection: {
		host: process.env.HOST,
		port: parseInt(process.env.PORT),
		database: process.env.DATABASE,
		user: process.env.USER,
		password: process.env.PASSWORD
	},
	migrations: {
		tableName: 'knex_migrations'
	}
}

const knex = require('knex')(config)
knex.migrate.latest([config])

module.exports = knex
