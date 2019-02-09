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
    let query = `select * from  ${configuration.database}.${tableName} ;`;
    connection.query(query, function(error, rows, fields) {
      if (error) throw error;
      let tableData = toJSON(rows);
      wirteToFile(`backup/${tableName}.data.json`, tableData);
    });
  });
  connection.end();
});
function wirteToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), err => {
    if (err) throw err;
    return;
  });
}
function toJSON(rows) {
  return Object.values(JSON.parse(JSON.stringify(rows)));
}
function saveUsers() {
  let users = Object.values(JSON.parse(JSON.stringify(rows)));
  file.write("[");
  for (user of users) {
    console.log(user);
    file.write(JSON.stringify(user));
    file.write(",");
  }
  file.write("]");
}
