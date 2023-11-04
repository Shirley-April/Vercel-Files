require("dotenv").config();

const { Dropbox } = require("dropbox");

const fs = require("fs");
const path = require("path")

const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const dbx = new Dropbox({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    const relativePath = path.join(__dirname, "../../tmp/vercel.pdf");


    fs.readFile(relativePath, (err, contents) => {
      if (err) {
        reject({ message: "Error reading file", error: err });
      } else {
        dbx
          .filesUpload({ path: `/vercel.pdf`, contents })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject({ message: "Error uploading file", error: err });
          });
      }
    });
  });
};

module.exports = { uploadFile };
