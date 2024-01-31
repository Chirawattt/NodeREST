// SQLite CRUD oprerations
// npm install sqlite3
// Create a Bood.sqlite file in Database folder
// Run this file with node CRUDBookSQLite.js
// Test with Postman

const express = require('express');
const sqlite3 = require('sqlite3'); // include sqlite3 library //*
const app = express();


// connect to database
const db = new sqlite3.Database('./Database/Book.sqlite'); //*

// parse incoming requests
app.use(express.json());

// create books table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

// route to get all books
app.get('/books', (req,res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err){
            res.status(500).send(err);
        }else {
            res.json(rows);
        }
    });
});

// route to get a book by id
app.get('/books/:id', (req,res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id ,(err, rows) => {
        if (err){
            res.status(500).send(err);
        }else {
            if (!rows) {
                res.status(404).send('Book not found');
            } else {
                res.json(rows);
            }
        }
    });
});

// route to create a new book
app.post('/books', (req,res) => {
    const book = req.body;
    db.run('INSERT INTO books (id, title, author) VALUES (?, ?, ?)', book.id, book.title, book.author, function(err) {
        if (err){
            res.status(500).send(err);
        }else {
            if (book.id == null) {
                book.id = this.lastID;
            }
            res.send(book);
        }
    });
});

// route to update a book
app.put('/books/:id', (req,res) => {
    // check if the book exists?
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err,existingBook) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!existingBook) res.status(404).send('Book not found');
            else {
                // Book exists, proceed with the update
                const book = req.body;
                db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function(err) {
                    if(err) res.status(500).send(err);
                    else res.send(book);
                });
            }
        }
    })
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, existingBook) => {
        if (err) res.status(500).send(err);
        else {
            if (!existingBook) res.status(404).send('Book not found');
            else {
                // Book exists, proceed with the delete
                db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err) {
                    if (err) res.status(500).send(err);
                    else  res.send({});
                });
            }
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); });