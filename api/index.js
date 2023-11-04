const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const { createFile } = require("./create-file");
const { uploadFile } = require("./dropbox/uploadFile");
const { downloadFile } = require("./dropbox/downloadFile");
const { deleteFile } = require("./dropbox/deleteFile");


const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("This is the /api route");
});

app.get("/", (req, res) => {
  res.send("This is the / route");
});

app.post("/api/file", async (req, res) => {
  const { title, fileName } = req.body;

  const file = await createFile(title, fileName);

  // console.log("FILE", file);

  // res.sendFile(file)

  const upload_file = await uploadFile(file);
  const download_file_link = await downloadFile();

//   console.log("UPLOAD", upload_file);

  if (upload_file.status === 200) {
    res.status(200).send({
      response: download_file_link,
    });
  }
  deleteFile()

//   res.sendFile(file);
});

const PORT = 3000;

app.listen(PORT, () => console.log("App is running on port " + PORT));

module.exports = app;
