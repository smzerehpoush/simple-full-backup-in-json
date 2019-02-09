const mysql = require("mysql");
const fs = require("fs");
const configuration = {
  host: "your_host",
  user: "your_username",
  password: "your_db_password",
  database: "your_database_name"
};
let connection = mysql.createConnection(configuration);
fs.mkdirSync("backup");
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
      wirteToFile(`backup/${tableName}.json`, tableData);
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
