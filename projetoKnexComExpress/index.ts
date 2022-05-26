import express from 'express'

const addressesRoute = require('./route/addressesRoute')
const projectsRoute = require('./route/projectsRoute')
const recordsRoute = require('./route/recordsRoute')
const researchersRoute = require('./route/researchersRoute')
const usersRoute = require('./route/usersRoute')

const app = express()

app.use(express.json())
app.use('/', addressesRoute)
app.use('/', projectsRoute)
app.use('/', recordsRoute)
app.use('/', researchersRoute)
app.use('/', usersRoute)

app.listen(3001, () => console.log("Server is running...\n"))