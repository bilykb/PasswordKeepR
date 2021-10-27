const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get list of passwords dashboard
  router.get("/", (req, res) => {
    const userIdCookie = req.session.user_id;
    const orgIdCookie = req.session.org_id;
    const emailCookie = req.session.email;
    const orderByOption = req.body.sort_by ? req.body.sort_by : `password_name`;

    if (!userIdCookie) {
      res.redirect("/user/login");
      return;
    }

    db.query(
      `
    SELECT accounts.email AS email,
           passwords.id AS password_id,
           passwords.name AS password_name,
           passwords.username AS password_username,
           passwords.url AS password_url,
           passwords.password AS password_password,
           categories.name AS password_category,
           accounts.organization_id AS organization_id
    FROM passwords
    JOIN categories ON passwords.category_id = categories.id
    JOIN accounts ON passwords.user_id = accounts.id
    WHERE passwords.user_id = $1
    AND passwords.org_id IS NULL
    ORDER BY $2;
    `,
      [userIdCookie, orderByOption]
    )

      .then((privateData) => {
        const passwordData = { private: privateData.rows };

        db.query(
          `
        SELECT organizations.name,
                passwords.id AS password_id,
                passwords.name AS password_name,
                passwords.username AS password_username,
                passwords.url AS password_url,
                passwords.password AS password_password,
                categories.name AS password_category
        FROM passwords
        JOIN categories ON passwords.category_id = categories.id
        JOIN organizations ON passwords.org_id = organizations.id
        JOIN accounts ON passwords.user_id = accounts.id
        WHERE organizations.id = $1
        ORDER BY $2;
        `,
          [orgIdCookie, orderByOption]
        )
        .then((orgData) => {
          const passwordOrg = { organization: orgData.rows };
          userPasswordsTemplateVars = {
            ...passwordData,
            ...passwordOrg,
            email: emailCookie
          };
          res.render("index", userPasswordsTemplateVars);
        });
      })
      .catch((err) => {
        console.log(err)
      });
  });

  //Create a new password
  router.post("/", (req, res) => {

    const userIdCookie = req.session.user_id;
    const orgIdCookie = req.session.org_id;

    const queryParams = [
      req.body.name,
      req.body.website,
      req.body.login,
      req.body.password,
      req.body.categories,
      userIdCookie,
      null
    ];

    db.query(`
    INSERT INTO passwords(name, url, username, password, category_id, user_id, org_id)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`
    , queryParams)
    .then((updatedInfo) => updatedInfo.rows[0])
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
    .then(res.redirect("/api/passwords"));
  });

  //Update a password
  router.post("/:id", (req, res) => {

    const queryText = `
      UPDATE passwords
      SET name = $1,
      url = $2,
      username = $3,
      password = $4,
      category_id = $5,
      modified = NOW()
      WHERE id = $6
      AND user_id = $7
      RETURNING *
    `;

    const queryValues = [
      req.body.name,
      req.body.website,
      req.body.login,
      req.body.password,
      req.body.categories,
      req.params.id,
      req.session.user_id,
    ];

    return db
      .query(queryText, queryValues)
      .then((updatedInfo) => updatedInfo.rows[0])
      .catch((err) => {
        res.status(500).json({ error: err.message });
      })
      .then(res.redirect("/api/passwords"));
  });

  //Delete a password
  router.post("/:id/delete", (req, res) => {
    const user_id = req.session.user_id;
    const passwordId = req.params.id;

    db.query(`SELECT * FROM passwords WHERE id = $1`, [passwordId])
      .then((data) => {
        return data.rows[0];
      })
      .then((password) => {
        if (password.user_id !== user_id) {
          return res.status(403).send("Authentication Failed");
        }
        return db.query(`DELETE FROM passwords WHERE id = $1`, [passwordId]);
      })
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error(err.message)
      })
  });

  return router;
};
