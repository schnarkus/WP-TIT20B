const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const hostname = "0.0.0.0";
const port = 8080;

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "index.ejs"
  });
});

app.get("/monitore", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "monitore.ejs"
  });
});

app.get("/grafikkarten", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "grafikkarten.ejs"
  });
});

app.get("/prozessoren", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "prozessoren.ejs"
  });
});

app.get("/peripherie", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "peripherie.ejs"
  });
});

app.get("/kontakt", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "kontakt.ejs"
  });
});

app.get("/impressum", (req, res) => {
  res.statusCode = 200;
  res.render("template", {
    main: "impressum.ejs"
  });
});

app.listen(port, hostname, () => {});
