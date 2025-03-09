const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const productService = require("./product.service.js");


class ProductController {
  createProduct = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      price:req?.body?.price,
      salePrice:req?.body?.salePrice,
      offer:req?.body?.offer,
      type: req?.body?.type,
      isActive: req?.body?.isActive,
    };
    const productResult = await productService.createProduct(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Product Created successfully",
      productResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllProduct = catchError(async (req, res) => {
    const productResult = await productService.getAllProduct();
    const resDoc = responseHandler(200, "Get All Products", productResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getProductWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const product = await productService.getProductWithPagination(payload);
    const resDoc = responseHandler(200, "Products get successfully", product);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleProduct = catchError(async (req, res) => {
    const id = req.params.id;
    const productResult = await productService.getSingleProduct(id);
    const resDoc = responseHandler(
      201,
      "Single Product successfully",
      productResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProduct = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
        title: req?.body?.title,
        details: req?.body?.details,
        price:req?.body?.price,
        salePrice:req?.body?.salePrice,
        offer:req?.body?.offer,
        type: req?.body?.type,
        isActive: req?.body?.isActive,
    };
    const productResult = await productService.updateProduct(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Product Update successfully",
      productResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProductStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const productResult = await productService.updateProductStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Product Status Update successfully",
      productResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteProduct = catchError(async (req, res) => {
    const id = req.params.id;

    const productResult = await productService.deleteProduct(id);
    const resDoc = responseHandler(
      200,
      "Product Deleted successfully",
      productResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ProductController();
