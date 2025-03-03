let persons = require('./persons.json')
const express = require('express')
const morgan = require('morgan')

const app = express()

const PORT = process.env.PORT ?? 1234

const generatedId = () => {
  const newId = Math.floor(Math.random() * 3500)
  return newId
}

app.use(express.json())
app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan('tiny')(req, res, () => {})
    console.log(` ${JSON.stringify(req.body)}`)
  }
  next()
})

app.get('/info', (req, res) => {
  const fecha = new Date()
  res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${fecha.toString()}<p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    return res.json(person)
  } return res.status(404).send('<h1>404 not found</h1>')
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const equalName = persons.find((person) => person.name === req.body.name)

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  } else if (equalName) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generatedId(),
    name: req.body.name,
    number: req.body.number
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
