const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    } else {
      const zip = new AdmZip(req.file.path);
      zip.extractAllTo("unzip/", /*overwrite*/ true);
      return res.status(200).json({
        message: "Arquivo descompactado com sucesso!",
      });
    }
  });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000!");
});
