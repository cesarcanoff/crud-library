const express = require("express");
const crypto = require("crypto");
const server = express();

const tools = require("./src/utils/index");
const { connection } = require("./src/database/database");

server.use(express.json());
server.get("/", (request, response) => response.json({ Status: "OK" }));

server.get("/books", (request, response) => {
  try {
    connection.query("SELECT * FROM Books;", (error, result) => {
      if (error) throw error;
      response.status(200).json(result);
    });
  } catch (error) {
    response.status(400).json(error);
  }
});

server.get("/book/:id", (request, response) => {
  let id = request.params.id;
  try {
    connection.query(
      `SELECT * FROM Books WHERE id = '${id}';`,
      (error, result) => {
        response.status(200).json(result);
      }
    );
  } catch (error) {
    response.status(400).json(error);
  }
});

server.post("/book", (request, response) => {
  let data = request.body;
  if (tools.isUndefined(data)) {
    try {
      let id = crypto.randomUUID();
      connection.query(
        `INSERT INTO Books (id, isbn, title, author, pages, category, year, language, cover) VALUES ('${id}', '${data.isbn}', '${data.title}', '${data.author}', '${data.pages}', '${data.category}', '${data.year}', '${data.language}', '${data.cover}');`,
        () => {
          response.status(201).json({ success: true });
        }
      );
    } catch (error) {
      throw error;
    }
  } else {
    response.status(400).json({ Success: false });
  }
});

server.put("/book/:id", (request, response) => {
  try {
    const id = request.params.id;
    const data = request.body;

    let sql = `UPDATE Books SET `;

    if (data.title) {
      sql += `title = '${data.title}', `;
    }

    if (data.author) {
      sql += `author = '${data.author}' `;
    }

    sql += `WHERE id = '${id}';`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      response.status(200).json(result);
    });
  } catch (error) {
    response.status(400).json(error);
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

server.listen(3333);
