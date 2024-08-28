const express = require("express");

const connectDB = require("./db/config");
connectDB();

const { getBooks, createBooks, updateBooks, removeBooks } = require("./controllers/books");

const app = express();

app.use(express.json());

app.get("/books", getBooks);
app.post("/books", createBooks);
app.put("/books/:id", updateBooks);
app.delete("/books/:id", removeBooks);

app.listen(3000, () => console.log("Server started!"));