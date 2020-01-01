const express = require("express");
const router = express.Router();

const features_model = require("../models/features.model");

router.get("/", async (req, res) => {
  const { limit = 6, offset = 0 } = req.query;
  const myJson = await features_model.get(limit, offset);
  res.json(myJson);
});
router.post("/", (req, res) => {
  res.send("features");
});
router.put("/", (req, res) => {
  res.send("features");
});
router.delete("/", (req, res) => {
  res.send("features");
});

module.exports = router;
