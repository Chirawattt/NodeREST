// Description: REST API with MongoDB
// npm install express mongoose body-parser
// Run this file with node MongoDBREST.js
// TEST with postman

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // go-back json file

// Database connection
mongoose.connect(
    "mongodb://admin:RLPgfq88547@node56975-chirawat-noderest.proen.app.ruk-com.cloud",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const Book = mongoose.model("Book", { // Book Model
    id: {
        type: Number,
        unique: true, // Ensures uniqueness of the "id" field -> PK
        required: true // If you want "id" to be required
    },
    title: String,
    author: String
});

const app = express();
app.use(bodyParser.json());

// Create
app.post("/books", async (req, res) =>{
    try {
        // Get the last book record to determine the next ID
        const lastBook = await Book.findOne().sort({id: -1}); // final element of lastbook if it's exists
        const nextId = lastBook ? lastBook.id + 1 : 1; // if it is lastbook lastbook + 1 to next book if isn't exist define to first book

        // Create a new book with the next ID
        const book = new Book({
            id: nextId, // Set the custom "id" field
            ...req.body, // Include other book data from the request body
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read all
app.get("/books", async (req, res) =>{
    try {
        const books = await Book.find(); // get all books
        res.send(books);
    }catch (error) {
        res.status(500).send(error);
    }
});

// Read one
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne({id: req.params.id}); // find by id give the condition or where to find
        res.send(book);
    } catch(err) { 
        res.status(500).send(error);
    }
});

// Update
app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({id: req.params.id}, req.body, { // if it's exist will be update
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete
app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({id: req.params.id}); // find the id we want and then delete it out
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});