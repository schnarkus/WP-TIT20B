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

const accounts = new Map(); //Key: Username; Inhalt: [Username, eigene Kommentare (Map), eigene Favoriten (Set), eigene meistebesuchte Seiten (Map)]
const alleKommentare = new Map(); //Key: Produktname; Inhalt: [Username, Kommentar]

app.get("/", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Startseite", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "index.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/monitore", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Monitore", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "monitore.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/grafikkarten", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Grafikkarten", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "grafikkarten.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/prozessoren", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Prozessoren", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "prozessoren.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/peripherie", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Peripherie", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "peripherie.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/kontakt", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Kontakt", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "kontakt.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/favoriten", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Favoriten", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "favoriten.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/meistbesucht", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Meistbesucht", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "meistbesucht.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/meinekommentare", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Kommentare", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "meinekommentare.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.get("/impressum", (req, res) => {
  var account = getAccount(req);
  if (account) {
    erhoeheInhaltsZaehler("Impressum", account);
  }

  res.statusCode = 200;
  res.render("template", {
    main: "impressum.ejs",
    account: account,
    alleKommentare: alleKommentare
  });
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  if (!accounts.has(username)) {
    accounts.set(username, [username, new Map(), new Set(), new Map()]);
    initialisiereInhaltsZaehler(accounts.get(username));
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

  if (!alleKommentare.has(artikelName)) {
    alleKommentare.set(artikelName, []);
  }

  alleKommentare.get(artikelName).push([account[0], kommentar]);
  account[1].set(artikelName, kommentar);
  res.redirect("back");
});

app.post("/favoritHinzufuegen", (req, res) => {
  var account = getAccount(req);
  if (!account) {
    return;
  }

  var artikelName = req.body.artikel;
  account[2].add(artikelName);
  res.redirect("back");
});

app.post("/favoritEntfernen", (req, res) => {
  var account = getAccount(req);
  if (!account) {
    return;
  }
  var artikelName = req.body.artikel;
  account[2].delete(artikelName);
  res.redirect("back");
});

function getAccount(req) {
  if (!req.cookies.hardwareVergleich46) {
    return null;
  }
  return accounts.get(req.cookies.hardwareVergleich46.username);
}

function initialisiereInhaltsZaehler(account) {
  account[3].set("Startseite", 0);
  account[3].set("Monitore", 0);
  account[3].set("Grafikkarten", 0);
  account[3].set("Prozessoren", 0);
  account[3].set("Peripherie", 0);
  account[3].set("Favoriten", 0);
  account[3].set("Meistbesucht", 0);
  account[3].set("Kommentare", 0);
  account[3].set("Kontakt", 0);
  account[3].set("Impressum", 0);
}

function erhoeheInhaltsZaehler(inhalt, account) {
  var oldValue = account[3].get(inhalt);
  account[3].set(inhalt, ++oldValue);
}

app.listen(port, hostname, () => {});
