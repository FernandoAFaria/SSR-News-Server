const express = require('express');
const db = require('../database/db');
const router = express.Router();
const isAuth = require('../middleware/isAuth');


router.get('/', isAuth, (req, res) => {
  res.send('this route is protected');
});
router.post('/', (req, res) => {
  res.send('test');
});
router.put('/', (req, res) => {
  res.send('test');
});
router.delete('/', (req, res) => {
  res.send('test');
});

module.exports = router;
