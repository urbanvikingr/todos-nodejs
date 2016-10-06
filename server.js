'use strict'
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const todos = require('./app/todos')

if (process.env.NODE_ENV === 'development') {
  mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}@${process.env.MONGODB_URI}`)
} else {
  mongoose.connect(process.env.MONGODB_URI)
}
const db = mongoose.connection

db.on('error', () => console.error('connection error'))
db.once('open', () => console.error('connection success'))

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/auth_handler', (req, res) => {
  if (res) {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log(res)
    console.log(res.query)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    res.status(200)
  }
})

app.get('/todos', (req, res) => todos.retrieveAll(req, res))
app.post('/todos', (req, res) => todos.create(req, res))
app.put('/todos/:id', (req, res) => todos.update(req, res))
app.delete('/todos/:id', (req, res) => todos.delete(req, res))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on ${port}`))

module.exports = app
