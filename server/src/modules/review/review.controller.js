const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const reviewService = require("./review.service.js");



class ReviewController {
  createReview = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      isActive: req?.body?.isActive,
    };
    const reviewResult = await reviewService.createReview(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Review Created successfully",
      reviewResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllReview = catchError(async (req, res) => {
    const reviewResult = await reviewService.getAllReview();
    const resDoc = responseHandler(200, "Get All Reviews", reviewResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getReviewWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const review = await reviewService.getReviewWithPagination(payload);
    const resDoc = responseHandler(200, "Reviews get successfully", review);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleReview = catchError(async (req, res) => {
    const id = req.params.id;
    const reviewResult = await reviewService.getSingleReview(id);
    const resDoc = responseHandler(
      201,
      "Single Review successfully",
      reviewResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateReview = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
        
        isActive: req?.body?.isActive,
    };
    const reviewResult = await reviewService.updateReview(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Review Update successfully",
      reviewResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateReviewStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const reviewResult = await reviewService.updateReviewStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Review Status Update successfully",
      reviewResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteReview = catchError(async (req, res) => {
    const id = req.params.id;

    const reviewResult = await reviewService.deleteReview(id);
    const resDoc = responseHandler(
      200,
      "Review Deleted successfully",
      reviewResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ReviewController();
