// Sarah Sami - 101334588

// imports
const fs = require("fs");
const parser = require("csv-parser");

if (fs.existsSync("./canada.txt")) {
  fs.rmSync("./canada.txt");
}

if (fs.existsSync("./usa.txt")) {
  fs.rmSync("./usa.txt");
}

// Read CSV file and filter data
const rows = [];

fs.createReadStream("./input_countries.csv")
  .pipe(parser())
  .on("data", (data) => rows.push(data))
  .on("end", () => {
    let canadaData = "country,year,population";
    let usaData = "country,year,population";

    rows
      .filter((x) => x.country === "Canada")
      .forEach(
        (val) =>
          (canadaData += `\n${val.country},${val.year},${val.population}`)
      );
    rows
      .filter((x) => x.country === "United States")
      .forEach(
        (val) => (usaData += `\n${val.country},${val.year},${val.population}`)
      );

    // Write to files
    fs.writeFileSync("./canada.txt", canadaData);
    fs.writeFileSync("./usa.txt", usaData);
  });
