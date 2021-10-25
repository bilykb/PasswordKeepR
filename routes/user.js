const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get login form
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).redirect("/");
      return;
    }
    return db
      .query(
        `
        SELECT * FROM accounts
        WHERE email = $1;
        `,
        [email]
      )
      .then((account) => {
        const accountInfo = account.rows[0];

        if (account.rows.length === 0) {
          res.status(400).redirect("/");
          return;
        }
        req.session["user_id"] = accountInfo.id;
        res.redirect("/api/passwords");
      })
      .catch((err) => console.log(err));
  });

  // logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).redirect('/user/login');
  });

  return router;
};
