const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const hostname = "0.0.0.0";
const port = 8080;

const accounts = new Map();

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "index.ejs",
    account: getAccount(req)
  });
});

app.get("/monitore", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "monitore.ejs",
    account: getAccount(req)
  });
});

app.get("/grafikkarten", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "grafikkarten.ejs",
    account: getAccount(req)
  });
});

app.get("/prozessoren", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "prozessoren.ejs",
    account: getAccount(req)
  });
});

app.get("/peripherie", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "peripherie.ejs",
    account: getAccount(req)
  });
});

app.get("/kontakt", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "kontakt.ejs",
    account: getAccount(req)
  });
});

app.get("/favoriten", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "favoriten.ejs",
    account: getAccount(req)
  });
});

app.get("/meistbesucht", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "meistbesucht.ejs",
    account: getAccount(req)
  });
});

app.get("/meinekommentare", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "meinekommentare.ejs",
    account: getAccount(req)
  });
});

app.get("/impressum", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "impressum.ejs",
    account: getAccount(req)
  });
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  if (!accounts.has(username)) {
    accounts.set(username, [username, new Map(), []]); //Username, Kommentare, Favoriten
    res.cookie("hardwareVergleich46", { username: username });
  }
  res.redirect("back");
});

app.post("/kommentarHinzufuegen", (req, res) => {
  var account = getAccount(req);
  if (!account) {
    return;
  }

  var artikelName = req.body.artikel;
  var kommentar = req.body.kommentar;

  account[1].set(artikelName, kommentar);
  res.redirect("back");
});

function getAccount(req) {
  return accounts.get(req.cookies.hardwareVergleich46.username);
}

app.listen(port, hostname, () => {});
