const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const articles_model = require("../models/articles.model");

router.get("/", async (req, res) => {
  const {
    limit = 6,
    offset = 0,
    href = "",
    categories = "all",
    keywords = []
  } = req.query;
  const myJson = await articles_model.get(
    limit,
    offset,
    href,
    categories,
    keywords
  );
  res.json(myJson);
});
router.post("/", isAuth, async (req, res) => {
  const body = req.body;
  try {
    const response = await articles_model.post(body);
    res.send(response);
  } catch (err) {
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
