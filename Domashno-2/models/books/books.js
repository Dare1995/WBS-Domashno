const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    author: String,
    title: String,
    year: Date,
    genre: String,
});

const BookModel = mongoose.model("Book", bookSchema, "books");

const getBook = async () => {
    return await BookModel.find();
};

const createBook = async (data) => {
    const newBook = new BookModel(data);
    return await newBook.save();
};

const updateBook = async (_id, data) => {
    return await BookModel.updateOne({ _id }, data);
};

const removeBook = async (_id) => {
    return await BookModel.deleteOne({ _id });
};
 module.exports = {
    getBook,
    createBook,
    updateBook,
    removeBook,
 };
