const { Router } = require("express");
const controller = require("../../modules/product/product.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ProductRoute = Router();
// ProductRoute.use(jwtAuth());

ProductRoute.route("/")
  .post(upload.any(), controller.createProduct) 
  .get(controller.getAllProduct);

ProductRoute.get("/pagination", controller.getProductWithPagination);

ProductRoute.route("/:id")
  .get(controller.getSingleProduct)
  .put(upload.any(), controller.updateProduct)
  .delete(controller.deleteProduct);




module.exports = ProductRoute;