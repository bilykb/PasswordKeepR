const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //Get list of passwords dashboard
  router.get("/passwords", (req, res) => {
    const userCookieId = req.session.user_id;
    const orderByOption = req.body.sort_by ? req.body.sort_by : `password_name`

    if (!userCookieId) {
      res.redirect('/user/login');
      return;
    }

    db.query(`
    SELECT accounts.email AS email,
           passwords.name as password_name,
           passwords.username AS password_username,
           passwords.url AS password_url,
           passwords.password as password_password,
           categories.name AS password_category,
           accounts.organization_id AS organization_id
    FROM passwords
    JOIN categories ON passwords.category_id = categories.id
    JOIN accounts ON passwords.user_id = accounts.id
    WHERE passwords.user_id = $1
    AND passwords.org_id IS NULL
    ORDER BY $2;
    `, [userCookieId, orderByOption])

      .then(privateData => {
        const passwordData = { passwords: privateData.rows };

        db.query(`
        SELECT organizations.name,
                passwords.name as password_name,
                passwords.username AS password_username,
                passwords.url AS password_url,
                passwords.password as password_password,
                categories.name AS password_category
        FROM passwords
        JOIN categories ON passwords.category_id = categories.id
        JOIN organizations ON passwords.org_id = organizations.id
        JOIN accounts ON passwords.user_id = accounts.id
        WHERE organizations.id = $1
        ORDER BY categories.name;
        `, [passwordData.organization_id])

        .then(orgData => {
          const passwordOrg = orgData.rows
          userPasswordsTemplateVars = {
            ...passwordData,
            ...passwordOrg
          }
        res.render("index", userPasswordsTemplateVars);
        })
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });


  //Get create a new password form
  router.get("/passwords/new", (req, res) => {

  });

  //Create a new password
  router.post("/passwords", (req, res) => {

  });

  //Update a password
  router.post("passwords/:id", (req, res) => {

  });

  //Delete a password
  router.post("passwords/:id", (req, res) => {

  });

  return router;
};
