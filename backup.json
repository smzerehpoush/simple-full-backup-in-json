const mysql = require("mysql");
const fs = require("fs");
const configuration = {
  host: "",
  user: "",
  password: "",
  database: ""
};
let connection = mysql.createConnection(configuration);
fs.mkdir("db-backup", error => {
  if (error.errno !== -17) {
    throw error;
  }
});
connection.connect();
connection.query("show tables", function(error, rows, fields) {
  if (error) throw error;
  let tables = toJSON(rows);
  tables.forEach(table => {
    const tableName = table["Tables_in_" + configuration.database];
    parseTableStructure(tableName);
    parseTableData(tableName);
  });
  connection.end();
});
function toJSON(rows) {
  return Object.values(JSON.parse(JSON.stringify(rows)));
}
function parseTableData(tableName) {
  let query = `select * from  ${configuration.database}.${tableName} ;`;
  connection.query(query, function(error, rows, fields) {
    if (error) throw error;
    let tableData = toJSON(rows);
    wirteToFile(`backup/${tableName}.data.json`, tableData);
  });
}
function parseTableStructure(tableName) {
  let query = `describe  ${configuration.database}.${tableName} ;`;
  connection.query(query, function(error, rows, fields) {
    if (error) throw error;

    let tableStructure = toJSON(rows);
    wirteToFile(`backup/${tableName}.structure.json`, tableStructure);
  });
}
function wirteToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), err => {
    if (err) throw err;
    return;
  });
}
