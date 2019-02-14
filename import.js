const helper = require("./helper");
const readline = require("readline");
const fs = require("fs");
const mysql = require("mysql");
const configuration = helper();
const basePath = `./${configuration.directory}`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter Password : \n", answer => {
  configuration.password = answer;
  r1.close();
});
// configuration.password = password;

let connection = mysql.createConnection(configuration);
connection.connect();
fs.readdir(basePath, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.endsWith(".data.json")) {
      let rawData = fs.readFileSync(basePath + "/" + file);
      let jsonObject = JSON.parse(rawData);
      if (!file.endsWith(".data.json")) return;
      let query = `INSERT INTO \`${configuration.database}\`.\`${file.slice(
        0,
        file.indexOf(".data.json")
      )}\` (`;
      const colmuns = [];
      if (jsonObject.length > 1)
        Object.keys(jsonObject[0]).forEach(col => colmuns.push(col));
      colmuns.forEach(col => (query += `\`${col}\` ,`));
      query = query.slice(0, -1);
      query += `) \n`;
      query += "VALUES (";
      jsonObject.forEach(item => {
        let query2 = query;
        colmuns.forEach(col => {
          query2 += `'${item[col]}' ,`;
        });
        query2 = query2.slice(0, -1);
        query2 += `) ;`;
        console.log(query2);
        connection.query(query2, function(error, rows, fields) {
          if (error) throw error;
          console.log(rows);
        });
      });
    }
  });
});
