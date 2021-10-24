// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// cookie-session
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["hello", "world"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const accountRoutes = require("./routes/user");
const passwordRoutes = require("./routes/api");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user", accountRoutes(db));
app.use("/api", passwordRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/user/login");
    return;
  }
  res.redirect("/api/passwords");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
