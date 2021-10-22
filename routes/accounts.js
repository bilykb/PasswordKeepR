const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get registration page
  router.get("/register"), (req, res) => {};

  // get login form
  router.get("/login"), (req, res) => {};

  // register a new user
  router.post("/register", (req, res) => {});

  // login (will need a login function)
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const queryText = `
      SELECT * FROM accounts
      WHERE email = $1
    `;

    const values = [email, password];

    const currentUser = db
      .query(queryText, values)
      .then((res) => res.rows[0])
      .catch((err) => console.log(err));
  });

  // logout
  router.post("/logout", (req, res) => {});

  return router;
};
