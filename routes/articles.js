const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const fs = require('fs'),
    request = require('request');
const path = require('path')
    const articles_model = require("../models/articles.model");

  //save image to our server


  const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  
 

router.get("/", async (req, res) => {
  const {
    limit = 6,
    offset = 0,
    href = "",
    categories = "all",
    keywords = [],
    viewAll = 'false'
  } = req.query;
  
  const myJson = await articles_model.get(
    limit,
    offset,
    href,
    categories,
    keywords,
    viewAll
  );
  res.json(myJson);
});
router.post("/", isAuth, async (req, res) => {
  const body = req.body;
  
  try {
   
    console.log('downloading image')
    download(body.media, (path.join(__dirname, '../../public/imgs') + `/${body.href}.jpg`), async function(){
      body.media = `/imgs/${body.href}.jpg`
      const response = await articles_model.post(body);
      res.send(response);
    });
    
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.sqlMessage });
  }
});
router.put("/:id", isAuth, async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  try {
    const response = await articles_model.put(id, body);
    res.send(response);
  } catch (err) {
    res.status(400).json({ error: err.sqlMessage });
  }
});

module.exports = router;
