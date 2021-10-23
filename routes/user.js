const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // get login form
  router.get('/login'), (req, res) => {
    // const currentUser = req.session.user_id;
    // console.log(req);
    // res.render('index');
  };

  router.post("/login", (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).redirect("/");
      return;
    }
    return db
      .query(`
        SELECT * FROM accounts
        WHERE email = $1;
        `, [email])
      .then((account) => {
        const accountInfo = account.rows[0]

        if (account.rows.length === 0) {
          res.status(400).redirect("/");
          return;
        }
        req.session["user_id"] = accountInfo.id;
        res.status(200).send({user: {account: accountInfo.email}});
      })
      .catch((err) => console.log(err));
  });


  // logout
  router.post('/logout', (req, res) => {
    res.clearCookie("session");
  })

  return router;
}
