const db = require("../database/db");
let sql = 'SELECT * from articles_table a INNER JOIN articles_count_table c ON a.id = c.id where a.is_active = 1 AND is_feature = 1 ORDER BY a.id DESC LIMIT ${cleanedLimit} OFFSET ${cleanedOffset}'
module.exports = {
  get: async function(limit = 6, offset = 0) {
    const cleanedLimit = db.fmlWeekly.escape(parseInt(limit));
    const cleanedOffset = db.fmlWeekly.escape(parseInt(offset));
    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(
        "SELECT * from articles_table a INNER JOIN articles_count_table c ON a.id = c.id where a.is_active = 1 AND is_feature = 1 ORDER BY a.id DESC LIMIT " +
          cleanedLimit +
          " OFFSET " +
          cleanedOffset,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  put: async function() {
    console.log("put");
  },
  post: async function() {
    console.log("delete");
  },
  delete: async function() {
    console.log("delete");
  }
};
