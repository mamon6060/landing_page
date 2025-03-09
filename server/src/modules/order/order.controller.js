const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const orderService = require("./order.service.js");



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
    const orderResult = await orderService.createOrder(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "order Created successfully",
      orderResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllOrder = catchError(async (req, res) => {
    const orderResult = await orderService.getAllOrder();
    const resDoc = responseHandler(200, "Get All Order", orderResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getOrderWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const order = await orderService.getProductWithPagination(payload);
    const resDoc = responseHandler(200, "Products get successfully", order);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOrder = catchError(async (req, res) => {
    const id = req.params.id;
    const orderResult = await orderService.getSingleProduct(id);
    const resDoc = responseHandler(
      201,
      "Single Order successfully",
      orderResult
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
        quantity: req?.body?.quantity,
        productRef: req?.body?.productRef,
        orderStatus: req?.body?.orderStatus,
        products: req?.body?.products,
       isActive: req?.body?.isActive,
    };
    const orderResult = await orderService.updateProduct(
      id,
    //   payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Order Update successfully",
      orderResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOrderStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const orderResult = await orderService.updateProductStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Order Status Update successfully",
      orderResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteOrder = catchError(async (req, res) => {
    const id = req.params.id;

    const orderResult = await orderService.deleteOrder(id);
    const resDoc = responseHandler(
      200,
      "Order Deleted successfully",
      orderResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new OrderController();
