const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const cartService = require("./cart.service.js");



class OrderController {
  createOrder = withTransaction(async (req, res, next, session) => {
    // const payloadFiles = {
    //   files: req.files,
    // };
    const payload = {
        name: req?.body?.name,
        phone: req?.body?.phone,
        address: req?.body?.address,
        shippingCost: req?.body?.shippingCost,
        totalCost: req?.body?.totalCost,
        orderStatus: req?.body?.orderStatus,
        products: req?.body?.products,
       isActive: req?.body?.isActive,
    };
    const cartResult = await cartService.createOrder(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "cart Created successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllOrder = catchError(async (req, res) => {
    const cartResult = await cartService.getAllOrder();
    const resDoc = responseHandler(200, "Get All Order", cartResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getOrderWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const cart = await cartService.getProductWithPagination(payload);
    const resDoc = responseHandler(200, "Products get successfully", cart);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOrder = catchError(async (req, res) => {
    const id = req.params.id;
    const cartResult = await cartService.getSingleProduct(id);
    const resDoc = responseHandler(
      201,
      "Single Order successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOrder = catchError(async (req, res) => {
    const id = req.params.id;
    
    const payload = {
      
        name: req?.body?.name,
        phone: req?.body?.phone,
        address: req?.body?.address,
        shippingCost: req?.body?.shippingCost,
        totalCost: req?.body?.totalCost,
        orderStatus: req?.body?.orderStatus,
        products: req?.body?.products,
       isActive: req?.body?.isActive,
    };
    const cartResult = await cartService.updateProduct(
      id,
    //   payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Order Update successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOrderStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const cartResult = await cartService.updateProductStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Order Status Update successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteOrder = catchError(async (req, res) => {
    const id = req.params.id;

    const cartResult = await cartService.deleteOrder(id);
    const resDoc = responseHandler(
      200,
      "Order Deleted successfully",
      cartResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new OrderController();
