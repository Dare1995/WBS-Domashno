const { getBook, createBook, updateBook, removeBook } = require("../models/books");
const { BookCreate, BookUpdate, validateBook } = require("../models/validate");


const getBooks = async (req, res) => {
    try {
        const books = await getBook();
        return res.status(200).send(books);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const createBooks = async (req, res) => {
    try {
        
        await validateBook(req.body, BookCreate); // validacija
        
        await createBook(req.body);
        return res.status(200).send("New book added!");
    } catch (err) {
        
        if (err.code === 400) {
            return res.status(400).send(err.error); // validacija error
        }
        
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

const updateBooks = async (req, res) => {
    try {
        
        await validateBook(req.body, BookUpdate); // validacija
        
        await updateBook(req.params.id, req.body);
        return res.status(200).send("Book updated successfully!");
    } catch (err) {
        
        if (err.code === 400) {
            return res.status(400).send(err.error) // validacija error
        
        }
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

const removeBooks = async (req, res) => {
    try {
        await removeBook(req.params.id);
        return res.status(200).send("Book removed successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getBooks,
    createBooks,
    updateBooks,
    removeBooks,
};
