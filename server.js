const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;

app.use(express.static(rootDir));

const sendFile = (file) => (_req, res) =>
  res.sendFile(path.join(rootDir, file));

app.get("/", sendFile("index.html"));
app.get("/offers", sendFile("offers.html"));
app.get("/example", sendFile("example.html"));

app.use((_req, res) => {
  res.status(404).send("Page non trouvée pour le moment sur StuDiscover.");
});

app.listen(PORT, () => {
  console.log(`StuDiscover server ready on http://localhost:${PORT}`);
});

