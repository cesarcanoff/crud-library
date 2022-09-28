const express = require("express");
const server = express();
const PORT = 3333;
const { connection } = require("./src/database/database");

server.use(express.json());
server.get("/", (request, response) => response.json({ Status: "OK" }));

/*
  {
	  "isbn": "9780132350884",
  	"title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  	"author": "Robert C. Martin",
  	"pages": 431,
  	"category": "Tech",
  	"year": 2008,
  	"language": "English",
    cover: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL.jpg"
  }
*/

server.get("/books", (request, response) => {
  try {
    const sql = "SELECT title FROM Library.Books;";
    connection.query(sql, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.get("/book/:isbn", (request, response) => {
  try {
    const isbn = request.params.isbn;
    const query = `SELECT isbn, title, author FROM library.book WHERE isbn = '${isbn}';`;
    connection.query(query, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.post("/book", (request, response) => {
  try {
    let data = request.body;
    let sql = `INSERT INTO Library.Books (isbn, title, author, pages, category, year, language, cover) VALUES ('${data.isbn}', '${data.title}', '${data.author}', '${data.pages}', '${data.category}', '${data.year}', '${data.language}, '${data.cover}');`;
    connection.query(sql, (error, result) => {
      response.status(201).json({ Success: true });
    });
  } catch (err) {
    throw err;
  }
});

server.put("/book/:isbn", (request, response) => {
  try {
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

    connection.query(sql, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.delete("/book/:id", (request, response) => {
  try {
    const id_book = request.params.id;
    const sql = `DELETE FROM library.book WHERE id = '${id_book}';`;
    connection.query(sql, (error, result) => {
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.listen(PORT);
