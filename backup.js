const parseArgs = require("./helper");
const mysql = require("mysql");
const fs = require("fs");
const configuration = parseArgs();
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
start();

function start() {
  rl.question("Enter Password : \n", answer => {
    configuration.password = answer;
    rl.close();
    createFile();

  });

}

function backup() {
  let connection = mysql.createConnection(configuration);
  connection.connect();
  connection.query("show tables", function(error, rows, fields) {
    if (error) throw error;
    let tables = toJSON(rows);
    tables.forEach(table => {
      const tableName = table["Tables_in_" + configuration.database];
      parseTableStructure(connection, tableName);
      parseTableData(connection, tableName);
    });
    connection.end();
  });
}

function createFile() {
  fs.mkdir(configuration.directory, error => {
    if (error["errno"] !== -17) {
      throw error;
    }
  });
}
function toJSON(rows) {
  return Object.values(JSON.parse(JSON.stringify(rows)));
}
function parseTableData(connection, tableName) {
  let query = `select * from  ${configuration.database}.${tableName} ;`;
  connection.query(query, function(error, rows, fields) {
    if (error) throw error;
    let tableData = toJSON(rows);
    wirteToFile(`${configuration.directory}/${tableName}.data.json`, tableData);
  });
}
function parseTableStructure(connection, tableName) {
  let query = `describe  ${configuration.database}.${tableName} ;`;
  connection.query(query, function(error, rows, fields) {
    if (error) throw error;

    let tableStructure = toJSON(rows);
    wirteToFile(
      `${configuration.directory}/${tableName}.structure.json`,
      tableStructure
    );
  });
}
function wirteToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), err => {
    if (err) throw err;
    return;
  });
}
