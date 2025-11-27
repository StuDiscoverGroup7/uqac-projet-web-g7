require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const prisma = require("./prisma/client");

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

app.use((req, res, next) => {
  res.locals.currentUserId = req.session?.userId || null;
  next();
});

const sendFile = (file) => (_req, res) =>
  res.sendFile(path.join(rootDir, file));

const PLACEHOLDER_MESSAGE = "Cette page arrive bientôt.";

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

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

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).render("auth/register", {
      error: "Email et mot de passe sont obligatoires.",
      values: { email, name },
    });
  }

  try {
    const existing = await prisma.user.findFirst({ where: { email } });
    if (existing) {
      return res.status(400).render("auth/register", {
        error: "Un compte existe déjà avec cet email.",
        values: { email, name },
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || null },
    });

    req.session.userId = user.id;
    res.redirect("/");
  } catch (err) {
    console.error("Erreur inscription:", err);
    res.status(500).render("auth/register", {
      error: "Une erreur est survenue. Merci de réessayer.",
      values: { email, name },
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("auth/login", {
      error: "Email et mot de passe sont obligatoires.",
      values: { email },
    });
  }

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).render("auth/login", {
        error: "Identifiants incorrects.",
        values: { email },
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).render("auth/login", {
        error: "Identifiants incorrects.",
        values: { email },
      });
    }

    req.session.userId = user.id;
    res.redirect("/");
  } catch (err) {
    console.error("Erreur connexion:", err);
    res.status(500).render("auth/login", {
      error: "Une erreur est survenue. Merci de réessayer.",
      values: { email },
    });
  }
});

app.get("/example", sendFile("example.html"));

app.get("/qui-sommes-nous", (req, res) => {
    res.render("qui-sommes-nous");
});


app.get("/nos-partenaires", (_req, res) => {
  res.render("nos-partenaires");
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
