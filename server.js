const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/style", express.static(path.join(__dirname, "style")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(rootDir));

const sendFile = (file) => (_req, res) =>
  res.sendFile(path.join(rootDir, file));

const PLACEHOLDER_MESSAGE = "Cette page arrive bientôt.";

app.get("/", sendFile("index.html"));
app.get("/offers", sendFile("offers.html"));
app.get("/example", sendFile("example.html"));

app.get("/qui-sommes-nous", (_req, res) => {
  res.render("placeholder", {
    pageTitle: "StuDiscover - Qui sommes-nous ?",
    title: "Qui sommes-nous ?",
    message: PLACEHOLDER_MESSAGE,
  });
});

app.get("/nos-partenaires", (_req, res) => {
  res.render("placeholder", {
    pageTitle: "StuDiscover - Nos partenaires",
    title: "Nos partenaires",
    message: PLACEHOLDER_MESSAGE,
  });
});

app.use((_req, res) => {
  res.status(404).render("placeholder", {
    pageTitle: "Page introuvable - StuDiscover",
    title: "Page introuvable",
    message: PLACEHOLDER_MESSAGE,
  });
});

app.listen(PORT, () => {
  console.log(`StuDiscover server ready on http://localhost:${PORT}`);
});
