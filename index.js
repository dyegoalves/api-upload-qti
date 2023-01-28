const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const uuid = require("uuid");

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

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "OK CONECT",
  });
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    } else {
      const zip = new AdmZip(req.file.path);
      zip.extractAllTo("unzip/" + uuid.v4(), /*overwrite*/ true);
      return res.status(200).json({
        message: "Arquivo descompactado com sucesso!",
      });
    }
  });
});

app.listen(80, () => {
  console.log("API rodando na porta 80!");
});
