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
  insertToDB();
});
function formatString(mystring) {
  // console.log(typeof mystring);
  return typeof mystring !== "string"
    ? mystring
    : mystring
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
}
// configuration.password = password;
function insertToDB() {
  let connection = mysql.createConnection(configuration);
  const files = fs.readdirSync(`${basePath}/data`);
  connection.connect();
  files.forEach(file => {
    if (file.endsWith(".json")) {
      let rawData = fs.readFileSync(`${basePath}/data/${file}`);
      let jsonObject = JSON.parse(rawData);
      let query = `INSERT INTO \`${configuration.database}\`.\`${file.slice(
        0,
        file.indexOf(".json")
      )}\` (`;

      jsonObject.forEach(item => {
        const colmuns = [];
        let query2 = query;
        Object.keys(item).forEach(col => {
          if (item[col] !== null) colmuns.push(col);
        });
        colmuns.forEach(col => (query2 += `\`${col}\` ,`));
        query2 = query2.slice(0, -1);
        query2 += `) `;
        query2 += "VALUES (";

        colmuns.forEach(col => {
          let d = item[col];

          if (col.includes("_date")) {
            if (item[col] && item[col].length === 24)
              query2 += `\'${d.slice(0, 10)} ${d.slice(11, 19)}\' ,`;
            else {
              // console.log(query2);
              query2 = `${query2.slice(
                0,
                query2.indexOf(col) - 1
              )} ${query2.slice(query2.indexOf(col) + 15, query2.length)}`;
              // console.log(query2);
            }
          } else if (d && d["type"] && d["type"] === "Buffer") {
            // console.log(query2)
            query2 += `b'${item[col]["data"][0]}' ,`;
          } else query2 += `\'${formatString(d)}\' ,`;
        });
        query2 = query2.slice(0, -1);
        query2 += `) ;`;
        // console.log(query2);
        connection.query(query2, function(error, rows, fields) {
          if (error) {
            console.log("Error for query : ", query2);
            throw error;
          }
          // console.log(rows);
        });
      });
    }
  });
  connection.end();
}
