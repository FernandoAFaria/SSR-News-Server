const express = require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
  if (req.body.sk ==="RogerDoger") {
    return next();
  }
  res.redirect('/');
});

module.exports = router;
