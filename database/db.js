const mysql = require("mysql");
const config = require("../config/config");

function createPool(dbName) {
  return mysql.createPool(config.returnDB(dbName));
}

//assign your database name to your site below
const siteDatabase = {
  fmlWeekly: createPool("fmlweekly"),
};

module.exports = siteDatabase;
