function returnDB(database) {
  connection = {
    host: "mysql.lifeprosolutions.net",
    user: "fmldbusr",
    password: "97sTHH6fn6jhNSA",
    database: database
  };
  return connection;
}

module.exports = {
  port: process.env.DEV == "true" ? 8000 : 8001,
  returnDB
};
