const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const createFile = (title, fileName) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    let file = path.join(process.cwd(), "tmp", `${fileName}.pdf`);

    // console.log("FILE::", typeof file);

    let writeStream = fs.createWriteStream(file);

    doc.pipe(writeStream);
    doc.text(title);
    doc.end();

    writeStream.on("finish", function () {
      resolve(file);
    });
    writeStream.on("error", function() {
        reject("Error creating the file!")
    })
  });
};

module.exports = { createFile };
