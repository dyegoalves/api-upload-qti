const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json({ mensage: "Rodando APP na port 80" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

app.listen(80, () => {
  console.log("Server started on PORT 80");
});
