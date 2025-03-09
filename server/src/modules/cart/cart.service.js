const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");

const cartRepository = require("./cart.repository.js");
// const productRepository = require("./product.repository.js");

class CartService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }






async createCart(payload) {
    // const { files } = payloadFiles;
    // if (!files) throw new Error("image is required");

    // const images = await ImgUploader(files);
    // for (const key in images) {
    //   payload[key] = images[key];
    // }

    const cartData = await this.#repository.createCart(payload);

   
    return cartData;
  }

  async getAllCart() {
    return await this.#repository.findAll({}, ["productId"], {}, { createdAt: 1 });
  }


  async getSingleCart(id) {
    const cartData = await this.#repository.findById(id);
    if (!cartData) throw new NotFoundError("Cart Not Find");
    return cartData;
  }

  async updateCart(id, payload) {
    // const { files } = payloadFiles;

    // if (files?.length) {
    //   const images = await ImgUploader(files);
    //   for (const key in images) {
    //     payload[key] = images[key];
    //   }
    // }

    const cartData = await this.#repository.updateById(id, payload);
    if (!cartData) throw new NotFoundError("Banner Not Find");

    // if (files.length && cartData) {
    //   await removeUploadFile(cartData?.image);
    // }
    return cartData;
  }

  async deleteCart(id) {
    const product = await this.#repository.findById(id);
    if (!product) throw new NotFoundError("Cart not found");
    const deleteCart = await this.#repository.deleteById(id);
    if (deleteCart) {
      await removeUploadFile(product?.image);
    }
    return deleteCart;
  }
}

module.exports = new CartService(cartRepository, "cart");
