require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 160000000, // 1 day session
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/style", express.static(path.join(__dirname, "style")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(rootDir));

const sendFile = (file) => (_req, res) =>
  res.sendFile(path.join(rootDir, file));

const PLACEHOLDER_MESSAGE = "Cette page arrive bientôt.";

app.get("/", (_req, res) => {
  res.render("index");
});

app.get("/offers", (_req, res) => {
  res.render("offers");
});

app.get("/register", (_req, res) => {
  res.render("auth/register", { error: null, values: {} });
});

app.get("/login", (_req, res) => {
  res.render("auth/login", { error: null, values: {} });
});

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
