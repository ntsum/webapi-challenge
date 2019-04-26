const express = require("express");

const db = require("./actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hubs = await db.get();
    res.status(200).json(hubs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `This action cannot be retrieved`
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hub = await db.get(id).then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({
          message: `This action does not exist.`
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `This action cannot be retrieved.`
    });
  }
});

router.post("/", async (req, res) => {
  const newAct = req.body;
  try {
    await db.insert(newAct);
    res.status(201).json({
      message: "New action created"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `This action had an error saving.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const hub = await db.get(id);
    await db.update(id, update).then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({
          message: `This action does not exist.`
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `An error has occured`
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const del = await db.get(id);
    await db.remove(id).then(del => {
      if (del) {
        res.status(200).json(del);
      } else {
        res.status(404).end({
          message: `This action does not exist.`
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Cannot remove action.`
    });
  }
});

module.exports = router;
