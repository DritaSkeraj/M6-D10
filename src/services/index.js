
/** put all routes together here and export out  */

const router = require("express").Router();

const productRouter = require("./product")

const reviewRouter = require("./review")
 
const cartRouter = require("./cart")

const categoryRouter = require("./category")
 

router.use("/product", productRouter)

router.use("/review", reviewRouter)

router.use("/cart", cartRouter)

router.use("/category", categoryRouter)

module.exports = router