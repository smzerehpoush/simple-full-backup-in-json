const fs = require("fs");
const mysql = require("mysql");
const configuration = { directory: "db-backup", password: "13@sMz&77" };

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
parseArgs();
let connection = mysql.createConnection(configuration);
connection.connect();

fs.readdir("./" + configuration.directory, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    // console.log(file);
    if (file.endsWith(".data.json")) {
      let rawData = fs.readFileSync(
        "./" + configuration.directory + "/" + file
      );
      let data = JSON.parse(rawData);
      let query = `INSERT INTO \`${configuration.database}\`.\`${file.slice(
        0,
        file.indexOf(".data.json")
      )}\` (`;
      let colmuns = [];
      if (data.length > 1)
        Object.keys(data[0]).forEach(col => colmuns.push(col));
      // Object.keys(data[0]).forEach(col => (query += `${col} ,`));
      //   data.forEach(item => {
      //     Object.keys(item).forEach(col => (query += `${col} ,`));
      //   });
      colmuns.forEach(col => (query += `\`${col}\` ,`));
      query = query.slice(0, query.length - 1);
      query += `) \n`;
      query += "VALUES (";
      data.forEach(item => {
        let query2 = query;
        colmuns.forEach(col => {
          query2 += `'${item[col]}' ,`;
        });
        query2 = query2.slice(0, query2.length - 1);
        query2 += `) ;`;
        console.log(query2);
        connection.query(query2, function(error, rows, fields) {
          if (error) throw error;
          //   // console.log(rows);
          //   // console.log(fields);
        });
        console.log(query2);
      });
      // console.log(data);
    }
  });
});
// connection.end();
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

// connection.query("show tables", function(error, rows, fields) {
//   if (error) throw error;
//   let tables = toJSON(rows);
//   tables.forEach(table => {
//     const tableName = table["Tables_in_" + configuration.database];
//     parseTableStructure(connection, tableName);
//     parseTableData(connection, tableName);
//   });
//   connection.end();
// });
