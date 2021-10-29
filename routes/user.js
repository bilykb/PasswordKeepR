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
        if (!account.rows[0]) {
            const errorMsg = 'Authentication failed';
            res.status(400).redirect(`/user/login?error=${errorMsg}`);
            return;
        }
        const hashedMain = account.rows[0].main_password
        if (!bcrypt.compareSync(masterPassword.trim(), hashedMain)) {
          return res.redirect("?error=Authentication failed - Please try again");
        }
        return account
      })
      .then((account) => {
        req.session["user_id"] = accountInfo.id;
        req.session["email"] = accountInfo.email;
        req.session["org_id"] = accountInfo.organization_id
        res.redirect("/passwords");
      })
      .catch((err) => console.error(err));
  });

  router.post('/register', (req, res) => {
    const { regEmail } = req.body;
    console.log('regEmail....', regEmail);
    const { regMasterPassword } = req.body;
    if (!regEmail) {
      res.status(400).redirect("/");
    }
    return db.query(`
    SELECT * FROM accounts WHERE email = $1
    `, [regEmail])
    .then(account => {
      if (account.rows.length === 0) {
        console.log('made it here yayayayay');
        return res.redirect('/?error=Email already exists- Please try again!')
      }
      return db.query(`
      INSERT INTO accounts(email, main_password, organization_id)
      VALUES($1, $2, $3)
      RETURNING *
      `
      ,[regEmail, regMasterPassword, null]) // need to hash the password
      .then(newAccount => {
        console.log('newAccount....', newAccount)
        req.session["user_id"] = newAccount.rows[0].id
      })
    })

  });

  // logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).redirect('/user/login');
  });

  return router;
};
