const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get list of passwords dashboard
  router.get("/passwords", (req, res) => {
    const userCookieId = req.session.user_id;

    if (!req.session.user_id) {
      res.redirect('/user/login');
      return;
    }

    db.query(
      `
      SELECT accounts.email AS email,
             passwords.name as password_name,
             passwords.username AS password_username,
             passwords.url AS password_url,
             passwords.password as password,
             categories.name AS category,
             organizations.name AS organization
      FROM accounts
      JOIN passwords ON accounts.id = passwords.user_id
      FULL JOIN organizations ON passwords.org_id= organizations.id
      JOIN categories ON passwords.category_id = categories.id
      WHERE accounts.id = $1;
      `, [userCookieId]
    )
      .then((data) => {
        console.log('data.rows....', data.rows)
        const userPasswordsTemplateVars = { passwords: data.rows };
        res.render("index", userPasswordsTemplateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get create a new password form
  router.get("/passwords/new", (req, res) => {});

  //Create a new password
  router.post("/passwords", (req, res) => {
  });

  //Update a password
  router.post("passwords/:id", (req, res) => {});

  //Delete a password
  router.post("passwords/:id", (req, res) => {});

  return router;
};
