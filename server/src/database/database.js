var mysql = require("mysql2");

let connect = () => {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "canoff",
    password: "password",
    database: 'Library'
  });
  
  connection.connect((error) => {
    if (error) throw error;
  });

  return connection;
}

exports.connection = connect();