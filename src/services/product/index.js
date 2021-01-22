const router = require("express").Router();

const { response } = require("express");
const Model = require("../../utils/model")

const Product = new Model('product');

router.get("/", async (req, res, next) => {
  try {
    const response  = await Product.findOne();
    res.send(response.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const {rows} = await Product.findById(req.params.id);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Product.save(req.body);
    res.send(response)
  } catch (e) {
    console.log(e)
    res.status(500).send(e.message);
  }

});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Product.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
