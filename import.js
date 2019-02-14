const helper = require("./helper");
const readline = require("readline");
const fs = require("fs");
const mysql = require("mysql");
const configuration = helper();
const basePath = `./${configuration.mainDirectory}/`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter Database Password : \n", answer => {
  configuration.password = answer;
  rl.close();
  insertToDB()
});
// configuration.password = password;
function insertToDB() {
  let connection = mysql.createConnection(configuration);
  const files = fs.readdirSync(`${basePath}/data`)
  connection.connect();
  files.forEach(file => {
    console.log(file);
    if (file.endsWith(".json")) {
      console.log(file)
      let rawData = fs.readFileSync(`${basePath}/data/${file}`);
      let jsonObject = JSON.parse(rawData);
      let query = `INSERT INTO \`${configuration.database}\`.\`${file.slice(
          0,
          file.indexOf(".json")
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
          let d = item[col]
          if (col.includes("_date") && item[col].length === 24) {
            query2 += `'${d.slice(0,10)} ${d.slice(11,19)}' ,`;
          } else if (item[col]["type"] === 'Buffer') {
            query2 += `b'${item[col]["data"][0]}' ,`
          } else query2 += `'${d}' ,`;
        });
        query2 = query2.slice(0, -1);
        query2 += `) ;`;
        console.log(query2);
        connection.query(query2, function (error, rows, fields) {
          if (error) throw error;
          console.log(rows);
        });
      });
    }
  });
  connection.end()
}