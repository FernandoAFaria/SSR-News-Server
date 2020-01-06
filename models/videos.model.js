const db = require("../database/db");

function returnKeywordMatch(keywordArr) {
  let sql = `AND (a.keywords LIKE '%${keywordArr[0]}%'`;
  if (keywordArr.length > 1) {
    for (let i = 1; i < keywordArr.length; i++) {
      sql += ` OR a.keywords LIKE '%${keywordArr[i]}%'`;
    }
  }
  sql += ")";
  return sql;
}

function returnSqlQuery(limit, offset, href, keywords) {
  let cleanedLimit = db.fmlWeekly.escape(parseInt(limit));
  let cleanedOffset = db.fmlWeekly.escape(parseInt(offset));
  let cleanedHref;
  let sqlQuery = "";
  if (href !== "") {
    cleanedHref = db.fmlWeekly.escape(href);
    sqlQuery = `SELECT * from videos_table WHERE is_active='1' AND href=${cleanedHref} ORDER BY id DESC LIMIT ${cleanedLimit}`;
  } else if (keywords.length !== 0) {
    //function to create keyword matching
    sqlQuery = `SELECT * from videos_table a INNER JOIN videos_count_table c ON a.id = c.id where a.is_active = 1 ${returnKeywordMatch(
      keywords
    )} ORDER BY a.publish_date DESC LIMIT ${cleanedLimit} OFFSET ${cleanedOffset}`;
  } else {
    sqlQuery = `SELECT * from videos_table a INNER JOIN videos_count_table c ON a.id = c.id where a.is_active = 1 ORDER BY a.id DESC LIMIT ${cleanedLimit} OFFSET ${cleanedOffset}`;
  }

  return sqlQuery;
}

module.exports = {
  get: async function(limit, offset, href, keywords) {
    let keywordArr = keywords.length === 0 ? keywords : keywords.split(" ");
    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(
        returnSqlQuery(limit, offset, href, keywordArr),
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
  put: async function(id, body) {
    console.log("videos model");
    const {
      title,
      intro,
      originated,
      content_block,
      media,
      url,
      href,
      is_active,
      is_feature,
      categories,
      keywords,
      publish_date
    } = body;

    const sqlQuery = ` UPDATE videos_table
      SET title = ${db.fmlWeekly.escape(title)},
      intro = ${db.fmlWeekly.escape(intro)},
      originated = ${db.fmlWeekly.escape(originated)},
      content_block = ${db.fmlWeekly.escape(content_block)},
      media = ${db.fmlWeekly.escape(media)},
      url = ${db.fmlWeekly.escape(url)},
      href = ${db.fmlWeekly.escape(href)},
      is_active = ${db.fmlWeekly.escape(is_active)},
      is_feature = ${db.fmlWeekly.escape(is_feature)},
      categories = ${db.fmlWeekly.escape(categories)},
      keywords = ${db.fmlWeekly.escape(keywords)},
      publish_date = ${db.fmlWeekly.escape(publish_date)}
      WHERE id = ${db.fmlWeekly.escape(id)}
    `;

    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(sqlQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  post: async function(body) {
    const {
      title,
      intro,
      originated,
      content_block,
      media,
      url,
      href,
      is_active,
      is_feature,
      categories,
      keywords
    } = body;
    const sqlQuery = `
    INSERT INTO videos_table (title,intro,originated,content_block,media,url,href,is_active,is_feature,categories,keywords)
    VALUES (${db.fmlWeekly.escape(title)},
    ${db.fmlWeekly.escape(intro)},
    ${db.fmlWeekly.escape(originated)},
    ${db.fmlWeekly.escape(content_block)},
    ${db.fmlWeekly.escape(media)},
    ${db.fmlWeekly.escape(url)},
    ${db.fmlWeekly.escape(href)},
    ${db.fmlWeekly.escape(is_active)},
    ${db.fmlWeekly.escape(is_feature)},
    ${db.fmlWeekly.escape(categories)},
    ${db.fmlWeekly.escape(keywords)});
    `;
    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(sqlQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  delete: async function() {
    console.log("delete");
  }
};
