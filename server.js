const http = require('http');
const mysql = require('mysql2');
const fs = require('fs');
const url = require('url');

function connectToDatabase() {
  const connection = mysql.createConnection({
    host: 'UNDCEMCS-SQL1.ad.und.edu',
    port: 3306,
    user: 'matias.miller',
    password: 'beatpose175',
    database: 'matiasmiller_db1'
  });

  return connection;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/checkDatabaseForErrors') {
    const connection = connectToDatabase();
    connection.connect((err) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (err) {
        res.end(JSON.stringify({ error: err.stack }));
      } else {
        res.end(JSON.stringify({ threadId: connection.threadId }));
      }
      connection.end(); // Close the connection
    });
  }

  if (parsedUrl.pathname === '/executeSqlQuery') {
    const query = parsedUrl.query.sql;

    if (query) {
      const connection = connectToDatabase();
      connection.query(query, (err, results) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (err) {
          res.end(JSON.stringify({ error: err.stack }));
        } else {
          res.end(JSON.stringify(results));
        }
        connection.end(); // Close the connection
      });
    } else {
      res.statusCode = 400;
      res.end('No SQL query provided');
    }
  }
});

const serverPort = 3000;

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});