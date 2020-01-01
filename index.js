const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config/config');

init();

function init() {
  //middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    session({
      secret: 'abc123',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000
      }
    })
  );
  //Auth middleware
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());

  //This reads the routes directory and creates a route for every file
  fs.readdir(path.join(__dirname, '/routes'), (err, routeFiles) => {
    routeFiles.forEach((route, ind) => {
      if (route === 'authenticate.js') {
        app.use(`/${removeExt(routeFiles[ind])}`, require(`./routes/${route}`));
      } else {
        app.use(`/api/${removeExt(routeFiles[ind])}`, require(`./routes/${route}`));
      }
    });
  });
  app.listen(config.port, () => console.log('listening on port ' + config.port));
}

function removeExt(str) {
  let strArr = str.split('.');
  return strArr[0];
}
