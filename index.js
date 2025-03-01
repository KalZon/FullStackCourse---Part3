const persons = require("./persons.json")
const express = require("express")

const app = express()

const PORT = process.env.PORT ?? 1234

app.get('/info', (req,res)=>{
    const fecha = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${fecha.toString()}<p>`
    )
})

app.get('/api/persons', (req, res)=>{
    res.json(persons)
})

app.use((req, res)=>{
    res.status(404).send('<h1>404 not found</h1>')  
})

app.listen(PORT, ()=>{
    console.log(`Server listening on: http://localhost:${PORT}`)
})
