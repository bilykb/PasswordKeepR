const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

module.exports = (db) => {
  // get login form
  router.get("/login", (req, res) => {
    if (req.query.error) {
      res.render("login", { error: req.query.error })
      return;
    }
    res.render("login", { error: null });
  });

  router.post("/login", (req, res) => {
    const { email } = req.body;
    const { masterPassword } = req.body;

    if (!email) {
      res.status(400).redirect("/");
      return;
    }
    return db
      .query(
        `
        SELECT * FROM accounts
        WHERE email = $1
        `,
        [email.trim(),]
      )
      .then(account => {
        const hashedMain = account.rows[0].main_password
        if (!bcrypt.compareSync(masterPassword.trim(), hashedMain)) {
          return res.redirect("?error=Authentication failed - Please try again");
        }
        return account
      })
      .then((account) => {

        const accountInfo = account.rows[0];

        if (!accountInfo) {
          const errorMsg = 'Authentication failed';
          res.status(400).redirect(`/user/login?error=${errorMsg}`);
          return;
        }
        req.session["user_id"] = accountInfo.id;
        req.session["email"] = accountInfo.email;
        req.session["org_id"] = accountInfo.organization_id
        res.redirect("/passwords");
      })
      .catch((err) => console.error(err));
  });

  // logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).redirect('/user/login');
  });

  return router;
};
