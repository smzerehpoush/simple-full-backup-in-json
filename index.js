const mysql = require("mysql");
const fs = require("fs");
const configuration = {
  host: "localhost",
  user: "mahdiyar",
  password: "13@sMz&77",
  database: "mahdiyardb"
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
