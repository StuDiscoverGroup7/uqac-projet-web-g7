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

app.get("/", sendFile("index.html"));
app.get("/offers", sendFile("offers.html"));
app.get("/example", sendFile("example.html"));

app.get("/qui-sommes-nous", (_req, res) => {
  res.render("placeholder", {
    pageTitle: "StuDiscover - Qui sommes-nous ?",
    title: "Qui sommes-nous ?",
    message: "Cette page arrive bientôt.",
  });
});

app.get("/nos-partenaires", (_req, res) => {
  res.render("placeholder", {
    pageTitle: "StuDiscover - Nos partenaires",
    title: "Nos partenaires",
    message: "Patience ! Nous finalisons la liste complète des entreprises et commerces partenaires.",
  });
});

app.use((_req, res) => {
  res.status(404).render("placeholder", {
    pageTitle: "Page introuvable - StuDiscover",
    title: "Page introuvable",
    message: "Désolé, cette page n'existe pas encore sur StuDiscover.",
  });
});

app.listen(PORT, () => {
  console.log(`StuDiscover server ready on http://localhost:${PORT}`);
});

