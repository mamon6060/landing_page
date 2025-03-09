const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");

const orderRepository = require("./order.repository.js");
// const orderRepository = require("./order.repository.js");

class OrderService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

async createOrder(payload) {
    // const { files } = payloadFiles;
    // if (!files) throw new Error("image is required");

    // const images = await ImgUploader(files);
    // for (const key in images) {
    //   payload[key] = images[key];
    // }

    const orderData = await this.#repository.createOrder(payload);

   
    return orderData;
  }

  async getAllOrder() {
    return await this.#repository.findAll({}, ["orderId"], {}, { createdAt: 1 });
  }


  async getSingleOrder(id) {
    const orderData = await this.#repository.findById(id);
    if (!orderData) throw new NotFoundError("Order Not Find");
    return orderData;
  }

  async updateOrder(id, payload) {
    // const { files } = payloadFiles;

    // if (files?.length) {
    //   const images = await ImgUploader(files);
    //   for (const key in images) {
    //     payload[key] = images[key];
    //   }
    // }

    const orderData = await this.#repository.updateById(id, payload);
    if (!orderData) throw new NotFoundError("Order Not Find");

    // if (files.length && orderData) {
    //   await removeUploadFile(orderData?.image);
    // }
    return orderData;
  }

  async deleteOrder(id) {
    const order = await this.#repository.findById(id);
    if (!order) throw new NotFoundError("Order not found");
    const deleteOrder = await this.#repository.deleteById(id);
    if (deleteOrder) {
      await removeUploadFile(order?.image);
    }
    return deleteOrder;
  }
}

module.exports = new OrderService(orderRepository, "Order");
