const express = require("express");
const server = express();
const crypto = require("crypto");
const PORT = 3333;
const { connection } = require("./src/database/database");

server.use(express.json());
server.get("/", (request, response) => response.json({ Status: "OK" }));

server.get("/books", (request, response) => {
  try {
    const sql = "SELECT * FROM Library.Books;";
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
    const query = `SELECT isbn, title, author FROM Library.Books WHERE isbn = '${isbn}';`;
    connection.query(query, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.post("/book", (request, response) => {
  let data = request.body;
  let id = crypto.randomUUID();
  try {
    let sql = `INSERT INTO Library.Books (id, isbn, title, author, pages, category, year, language, cover) VALUES ('${id}', '${data.isbn}', '${data.title}', '${data.author}', '${data.pages}', '${data.category}', '${data.year}', '${data.language}', '${data.cover}');`;
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
    const sql = `DELETE FROM Library.Books WHERE id = '${id_book}';`;
    connection.query(sql, (error, result) => {
      response.json(result);
    });
  } catch (error) {
    throw error;
  }
});

server.listen(PORT);
