const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //Get list of passwords dashboard
  router.get('/passwords'), (req, res) => {

  };

  //Get create a new password form
  router.get('/passwords/new', (req, res) => {

  });

  //Create a new password
  router.post('/passwords', (req, res) => {

  });

  //Update a password
  router.post('passwords/:id', (req, res) => {

  });

  //Delete a password
  router.post('passwords/:id', (req, res) => {

  });

  return router;
}
