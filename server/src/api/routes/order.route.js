const { Router } = require("express");
const controller = require("../../modules/order/order.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const OrderRoute = Router();
// OrderRoute.use(jwtAuth());

OrderRoute.route("/")
  .post(upload.any(), controller.createOrder) 
  .get(controller.getAllOrder);

OrderRoute.get("/pagination", controller.getOrderWithPagination);

OrderRoute.route("/:id")
  .get(controller.getSingleOrder)
  .put(upload.any(), controller.updateOrder)
  .delete(controller.deleteOrder);




module.exports = OrderRoute;
