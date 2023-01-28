const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.post("/upload", upload.single("file"), (req, res) => {
  // Obtém o caminho do arquivo enviado
  const file = req.file;
  // Define o caminho onde o arquivo será salvo
  const filePath = "./uploads/" + file.originalname;
  // Escreve o arquivo no disco
  fs.writeFileSync(filePath, file.buffer);
  res.send("Arquivo salvo com sucesso!");
});

app.listen(80, () => {
  console.log("API rodando na porta 80");
});
