const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get login form
  router.get("/login", (req, res) => {
    if (req.query.error) {
      console.log('there has been an erorr.....', req.query.error)
      res.render("login", { error: req.query.error })
      return;
    }
    res.render("login", { error: null });
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

        if (!accountInfo) {
          const errorMsg = 'Authentication failed';
          res.status(400).redirect(`/api/user/login?error=${errorMsg}`);
          return;
        }
        req.session["user_id"] = accountInfo.id;
        req.session["email"] = accountInfo.email;
        req.session["org_id"] = accountInfo.organization_id
        res.redirect("/api/passwords");
      })
      .catch((err) => console.log(err));
  });

  // logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).redirect('/api/user/login');
  });

  return router;
};
