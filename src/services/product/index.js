const router = require("express").Router();

const multer = require("multer");
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { response } = require("express");
const Model = require("../../utils/model")

const Product = new Model('product');
const db = require("../../utils/db");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "market",
  },
});

const cloudinaryMulter = multer({ storage: storage });


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

router.get("/productReviews/:pid", async(req, res, next) =>{
  try{
    const {rows} = await Product.getProductReviews(req.params.pid)
    res.send(rows);
  } catch(error){
    console.log(error)
    res.status(500).send(error)
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

router.post("/:id/upload/", cloudinaryMulter.single("image"), 
            async(req, res, next) => {
  try{
    const query = `UPDATE product SET image_url='${req.file.path}' 
                    WHERE id=${req.params.id};`
    res = await db.query(query);
    return res;
  } catch(error){
    next(error)
  }
})

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
