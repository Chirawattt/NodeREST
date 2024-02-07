// Description: Node Express REST API with Sequelize and SQLite CRUD Book
// npm install express sequelize sqlite3
// Run this file with node SequlizeSQLiteCRUDBook.js
// Test with Postman

const express = require('express'); // web framework
const Sequelize = require('sequelize');
const app = express(); // web app

// parse incoming requests
app.use(express.json()); // format to transfer data is json

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', // use format of sqlite
    storage: './Database/SQBooks.sqlite' // database store at
});

// define the Book model //* Important final
const Book = sequelize.define('book', { // 'objectname', {object detail}
    id: {
        type: Sequelize.INTEGER, // type int
        autoIncrement: true, // auto add id we just put title, author
        primaryKey: true // make id to be primary key which can serch by id
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false // not allow to null
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create the Book table if it doesn't exist
sequelize.sync();

// route to get all books
app.get('/books', (req, res) => {
    Book.findAll().then(books => { // findAll is pull all data
        res.json(books); // response to json file with (data)
    }).catch(err => { // if it's not find will send error
        res.status(500).send(err);
    });
});

// route to get book by id
app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => { // sent PK parameter
        if (!book) { // not found a book
            res.status(404).send('Book not found');
        } else { // found a book will return book
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create a new book
app.post('/books', (req, res) => {
    Book.create(req.body).then(book => { // we can put req.body into create
        res.json(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to update a book
app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => { // findByPk before update if it's exist
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() => { // update by req.body
                res.json(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => { // find if this id is exist
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => { // destroy is delete // we use method in sequelize we don't use sqlite command
                res.json({}); // send {} to display
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));