const express = require("express");

const app = express();
const PORT = 3333;

app.use(express.json());

app.get("/", (request, response) => {
  response.json({});
});

app.get("/books", (request, response) => {
  response.json({});
});

app.get("/authors", (request, response) => {
  response.json({});
})

app.listen(PORT);
