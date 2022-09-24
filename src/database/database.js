var mysql = require("mysql");

let connect = () => {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "canoff",
    password: "password",
  });
  
  connection.connect((error) => {
    if (error) throw error;
  });

  return connection;
}

exports.connection = connect();