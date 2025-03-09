const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const cartService = require("./cart.service.js");



class CartController {
  createCart = withTransaction(async (req, res, next, session) => {
    // const payloadFiles = {
    //   files: req.files,
    // };
    const payload = {
        productId: req?.body?.productId,
        quantity: req?.body?.quantity,
       isActive: req?.body?.isActive,
    };
    const cartResult = await cartService.createCart(
      payload,
    //   payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "cart Created successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllCart = catchError(async (req, res) => {
    const cartResult = await cartService.getAllCart();
    const resDoc = responseHandler(200, "Get All Cart", cartResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCartWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const cart = await cartService.getProductWithPagination(payload);
    const resDoc = responseHandler(200, "Products get successfully", cart);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleCart = catchError(async (req, res) => {
    const id = req.params.id;
    const cartResult = await cartService.getSingleProduct(id);
    const resDoc = responseHandler(
      201,
      "Single Cart successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateCart = catchError(async (req, res) => {
    const id = req.params.id;
    
    const payload = {
      
        productId: req?.body?.productId,
        quantity: req?.body?.quantity,
       isActive: req?.body?.isActive,
    };
    const cartResult = await cartService.updateProduct(
      id,
    //   payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Cart Update successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateCartStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const cartResult = await cartService.updateProductStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Cart Status Update successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteCart = catchError(async (req, res) => {
    const id = req.params.id;

    const cartResult = await cartService.deleteCart(id);
    const resDoc = responseHandler(
      200,
      "Cart Deleted successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new CartController();
