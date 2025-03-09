const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");
const productRepository = require("./product.repository.js");

class ProductService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }






async createProduct(payload, payloadFiles) {
    const { files } = payloadFiles;
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const productData = await this.#repository.createProduct(payload);

   
    return productData;
  }

  async getAllProduct() {
    return await this.#repository.findAll({}, [], {},);
  }

//   async getBannerWithPagination(payload) {
//     const banner = await this.#repository.getBannerWithPagination(payload);
//     return banner;
//   }

  async getSingleProduct(id) {
    const productData = await this.#repository.findById(id);
    if (!productData) throw new NotFoundError("Banner Not Find");
    return productData;
  }

  async updateProduct(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const productData = await this.#repository.updateById(id, payload);
    if (!productData) throw new NotFoundError("Banner Not Find");

    if (files.length && productData) {
      await removeUploadFile(productData?.image);
    }
    return productData;
  }

  async deleteProduct(id) {
    const product = await this.#repository.findById(id);
    if (!product) throw new NotFoundError("Banner not found");
    const deleteProduct = await this.#repository.deleteById(id);
    if (deleteProduct) {
      await removeUploadFile(product?.image);
    }
    return deleteProduct;
  }
}

module.exports = new ProductService(productRepository, "product");
