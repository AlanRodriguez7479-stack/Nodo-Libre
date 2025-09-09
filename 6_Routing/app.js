const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
  })

app.get('/secret', (req, res) => {
    res.send('GET request to the secret')
})

//Route path: /users/:userId/books/:bookId
//Request URL: http://localhost:3000/users/34/books/8989
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
  })


const cb0 = function (req, res, next) {
console.log('CB0')
next()
}

const cb1 = function (req, res, next) {
console.log('CB1')
next()
}

const cb2 = function (req, res) {
res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])


app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from D!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})