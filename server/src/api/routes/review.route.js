const { Router } = require("express");

// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");
const controller = require("../../modules/review/review.controller.js");
const ReviewRoute = Router();
// ReviewRoute.use(jwtAuth());

ReviewRoute.route("/")
  .post(upload.any(), controller.createReview) 
  .get(controller.getAllReview);

ReviewRoute.get("/pagination", controller.getReviewWithPagination);

ReviewRoute.route("/:id")
  .get(controller.getSingleReview)
  .put(upload.any(), controller.updateReview)
  .delete(controller.deleteReview);




module.exports = ReviewRoute;