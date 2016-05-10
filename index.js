'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const todos = require('./todos')
require('./env')

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/todos', (req, res) => todos.retrieveAll(req, res))
app.post('/todos', (req, res) => todos.create(req, res))
app.put('/todos/:id', (req, res) => todos.update(req, res))
app.delete('/todos/:id', (req, res) => todos.delete(req, res))

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`listening on ${port}`))

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}@${process.env.MONGODB_URI}`)
const db = mongoose.connection

db.on('error', () => console.error('connection error'))
db.once('open', () => console.error('connection success'))

module.exports = app
