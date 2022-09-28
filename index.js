const express = require("express");
const server = express();
const PORT = 3333;

server.use(express.json());

const { connection } = require("./src/database/database");

server.get("/", (request, response) => response.json({ Status: "OK" }));

/*
  {
	  "isbn": "9780132350884",
  	"title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  	"author": "Robert C. Martin",
  	"pages": 431,
  	"category": "Tech",
  	"year": 2008,
  	"language": "English"
  }
*/

server.post("/book", (request, response) => {
  let data = request.body;
  try {
    let sql = `INSERT INTO library.book (isbn, title, author, pages, category, year, language) VALUES ('${data.isbn}', '${data.title}', '${data.author}', '${data.pages}', '${data.category}', '${data.year}', '${data.language}');`;
    connection.query(sql, (error, result) => {
      response.status(201).json({ Success: true });
    });
  } catch (err) {
    throw err;
  }
});

server.delete("/book/:id", (request, response) => {
  const id_book = request.params.id;
  const sql = `DELETE FROM library.book WHERE id = '${id_book}';`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.json(result);
  });

})


server.put("/book/:isbn", (request, response) => {
  const isbn = request.params.isbn;
  let data = request.body;

  let sql = `UPDATE library.book SET `;

  if (data.title) {
    sql += `title = '${data.title}', `;
  }

  if (data.author) {
    sql += `author = '${data.author}' `;
  }

  sql += `WHERE isbn = '${isbn}';`;
  console.log(sql);

  // sql = `UPDATE library.book SET title = '${data.title}' author = '${data.author}' WHERE isbn = '${isbn}';`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

server.get("/books", (request, response) => {
  const sql = "SELECT * FROM library.book;";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

server.get("/book/:isbn", (request, response) => {
  const isbn = request.params.isbn;
  const query = `SELECT isbn, title, author FROM library.book WHERE isbn = '${isbn}';`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

server.listen(PORT);
