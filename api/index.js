const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("This is the /api route");
});

app.get("/", (req, res) => {
  res.send("This is the / route");
});


app.post("/file", async (req, res) => {
  const { title, fileName } = req.body;
  const doc = new PDFDocument();

  let file = path.join(process.cwd(), "tmp", `${fileName}.pdf`);

  let writeStream = fs.createWriteStream(file);

  doc.pipe(writeStream);
  doc.text(title);
  doc.end();

  writeStream.on("finish", function () {
    res.sendFile(file)
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log("App is running on port " + PORT));

module.exports = app;
