const router = require("express").Router();
const { Readinglist } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.post("/", async (req, res) => {
  const readinglist = await Readinglist.create(req.body);
  res.json(readinglist);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readinglist = await Readinglist.findByPk(req.params.id);

  if (readinglist) {
    if (readinglist.userId !== req.decodedToken.id) {
      return res.status(401).send({ error: "invalid user" });
    }

    readinglist.read = req.body.read;
    await readinglist.save();
    res.json(readinglist);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
