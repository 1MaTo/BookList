var express = require('express');
var bookData = require('../data/books.json')
var app = express();

app.listen(8080, function () {
});

app.use(express.json());

app.all('*', (request, response, next) => {
    console.log("Request to " + request.originalUrl)
    response.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.options('*', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Method', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
})

app.get('/api/books', (req, res) => {
    res.status(200).send(bookData)
});

app.get('/api/book/:id', (req, res) => {
    const book = bookData.filter(book => book.id + '' === req.params.id + '')
    book.length !== 0 ? res.status(200).send(book) : res.status(404).send('Book not found')
})