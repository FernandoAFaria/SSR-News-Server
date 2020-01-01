const db = require("../database/db");

function returnSqlQuery(limit, offset, href) {
  let cleanedLimit = db.fmlWeekly.escape(parseInt(limit));
  let cleanedOffset = db.fmlWeekly.escape(parseInt(offset));
  let cleanedHref;
  let sqlQuery = "";
  if (href !== "") {
    cleanedHref = db.fmlWeekly.escape(href);
    sqlQuery = `SELECT * from videos_table WHERE is_active='1' AND href=${cleanedHref} ORDER BY id DESC LIMIT ${cleanedLimit}`;
  } else {
    sqlQuery = `SELECT * from videos_table a INNER JOIN videos_count_table c ON a.id = c.id where a.is_active = 1 ORDER BY a.id DESC LIMIT ${cleanedLimit} OFFSET ${cleanedOffset}`;
  }

  return sqlQuery;
}

module.exports = {
  get: async function(limit, offset, href) {
    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(
        returnSqlQuery(limit, offset, href),
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
  put: async function(id,body) {
    console.log('videos model')
    const { title, intro, originated, content_block, media, url, href, is_active, is_feature, categories, keywords, publish_date} = body;
    
    
    const sqlQuery = 
    ` UPDATE videos_table
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
    `
    
    return new Promise((resolve, reject) => {
      db.fmlWeekly.query(sqlQuery,
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
