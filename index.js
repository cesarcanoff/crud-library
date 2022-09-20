const express = require("express");
const app = express();
const PORT = 3333;

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "canoff",
  password: "password",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected!");
});

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ Status: "OK" });
});

app.post("/book", (request, response) => {
  let data = request.body;

  let sql = `INSERT INTO library.book (isbn, title, author) VALUES ('${data.isbn}', '${data.title}', '${data.author}');`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.statusCode = 201;
    response.json({"Success": true});
  });
});

app.get("/books", (request, response) => {
  let sql = "SELECT isbn, title, author FROM library.book;";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

app.get("/book/:isbn", (request, response) => {
  const isbn = request.params.isbn;
  const query = `SELECT isbn, title, author FROM library.book WHERE isbn = '${isbn}';`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

app.listen(PORT, () => {
  console.log("Server is running at localhost:3333");
});
