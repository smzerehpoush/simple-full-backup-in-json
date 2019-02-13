const fs = require("fs");
const mysql = require("mysql");
const configuration = { directory: "db-backup", password: "13@sMz&77" };
import { parseArgs } from "./helper";
const basePath = `./${configuration.directory}`;
parseArgs();
let connection = mysql.createConnection(configuration);
connection.connect();
fs.readdir(basePath, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.endsWith(".data.json")) {
      let rawData = fs.readFileSync(basePath + "/" + file);
      let jsonObject = JSON.parse(rawData);
      if(!file.endsWith(".data.json"))
      continue ;
      let query = `INSERT INTO \`${configuration.database}\`.\`${file.slice(
        0,
        file.indexOf(".data.json")
      )}\` (`;
      const colmuns = [];
      if (jsonObject.length > 1)
        Object.keys(jsonObject[0]).forEach(col => colmuns.push(col));
      colmuns.forEach(col => (query += `\`${col}\` ,`));
      query = query.slice(0, - 1);
      query += `) \n`;
      query += "VALUES (";
      jsonObject.forEach(item => {
        let query2 = query;
        colmuns.forEach(col => {
          query2 += `'${item[col]}' ,`;
        });
        query2 = query2.slice(0, - 1);
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