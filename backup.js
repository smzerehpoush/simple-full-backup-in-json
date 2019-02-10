const mysql = require("mysql");
const fs = require("fs");
const readline = require("readline");

const configuration = { directory: "db-backup", password: "13@sMz&77" };
backup();
function backup() {
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  // rl.question("Enter Password : \n", answer => {
  //   configuration.password = answer;
  //   r1.close();
  // });
  // // configuration.password = password;
  parseArgs();
  createFile();
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
function getArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length - 1; i++) {
    const arg = process.argv[i];
    const next = process.argv[i + 1];
    const argValue = arg.slice(arg.lastIndexOf("-") + 1, arg.length);
    if (arg.startsWith("-")) {
      if (next.startsWith("-")) args[argValue] = true;
      else args[argValue] = next;
      i++;
    }
  }
  return args;
}
function parseArgs() {
  const args = getArgs();
  Object.keys(args).forEach(arg => {
    switch (arg) {
      case "u":
        configuration.user = args[arg];
        break;
      case "h":
        configuration.host = args[arg];
        break;
      case "d":
        configuration.database = args[arg];
        break;
      default:
        break;
    }
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
