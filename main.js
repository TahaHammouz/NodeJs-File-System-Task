const csv = require("@fast-csv/parse");
const { parse } = require("csv-parse");
const fs = require("fs");

var users = fs.readFileSync("./users.csv", "utf8");
users = users.split("\r\n").slice(1);
for (let i in users) {
  users[i] = users[i].split(",");
}

function readCSV() {
  fs.createReadStream("./users.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
    });
  console.log("CSV read");
}
function saveToFile() {
  var data = {};
  data.table = [];
  var obj = {
    users: users,
  };
  data.table.push(obj);

  fs.writeFile("input.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("Save To File");
  });
}

var readJsonFile = () => {
  fs.readFile("./input.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("input.json data:", jsonString);
  });
};

readCSV();
saveToFile();
readJsonFile();
