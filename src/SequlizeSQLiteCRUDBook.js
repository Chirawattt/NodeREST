// Description: Node Express REST API with Sequelize and SQLite CRUD Book
// npm install express sequelize sqlite3
// Run this file with node SequlizeSQLiteCRUDBook.js
// Test with Postman

const express = require('express');
const Sequelize = require('sequelize');
const app = express();

// parse incoming requests
app.use(express.json());

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQBooks.sqlite'
});

// define the Book model
const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create the Book table if it doesn't exist
sequelize.sync();

// Renumber IDs of Book
async function renumberData(){
    try{
        // Find all Books
        const books = await Book.findAll();
        
        // Renumber IDs
        let newId = 1;
        for (const book of books) {
            await Book.update({ id: newId++}, {where: {id: book.id}});
        }
    }catch (error) {
        console.log('Error renumbering data: ', error);
    }
}

// route to get all books
app.get('/books', (req, res) => {
    renumberData();
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to get book by id
app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create a new book
app.post('/books', async (req, res) => {
    try {
        if (req.body.id === undefined) {
            // If the user doesn't provied the ID, create the book with the next consecutive ID
            const maxId = await Book.max('id');
            Book.create({
                id: maxId ? maxId+1 : 1,
                title: req.body.title,
                author: req.body.author
            }).then(book => {
                res.json(book);
            })
        }else {
            // If user provides the ID, create the book with provied one        
            await Book.create(req.body).then(book => {
                res.json(book);
            })
        }
    }catch (error) {
        res.status(500).send(err);
    }
});

// route to update a book
app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() => {
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
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.json({});
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
