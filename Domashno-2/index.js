const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./db/config");
connectDB();

const { getSection } = require("./config/index");
const { getBooks, createBooks, updateBooks, removeBooks } = require("./handlers/books");
const {
    getAllPosts,
    createPost,
    updatePost,
    removePost,
  } = require("./handlers/posts");

const app = express();

app.use(express.json());
// app.use(
//     jwt({
//       secret: getSection("development").jwt_secret,
//       algorithms: ["HS256"],
//     }).unless({
//       path: ["/auth/login", "/auth/register"],
//     })
//   );

app.get("/books", getBooks);
app.post("/books", createBooks);
app.put("/books/:id", updateBooks);
app.delete("/books/:id", removeBooks);

app.get("/posts", getAllPosts);
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", removePost);


app.listen(getSection("development").port, () =>
    console.log(`Server started at port ${getSection("development").port}!`)
  );