require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const appHTTP = express();
const portHTTP = 80;
appHTTP.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
appHTTP.use(bodyParser.json());
appHTTP.use(express.static(__dirname + "/public"));
appHTTP.post("/sign", (req, res) => {
  if (
    req.body.inputEmail === "sarah.johnson" &&
    req.body.inputPassword === "ghu24zs!"
  ) {
    res.redirect("/check?role=user");
  } else {
    res.redirect("/");
  }
});

appHTTP.get("/check", (req, res) => {
  if (req.query.role === "admin") {
    res.sendFile(__dirname + "/public/admin.html");
  } else {
    res.sendFile(__dirname + "/public/user.html");
  }
});

appHTTP.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/sign.html");
});

appHTTP.listen(portHTTP, () => {
  console.info(`App (HTTP) listening on port ${portHTTP}`);
});
