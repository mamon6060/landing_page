const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");
const reviewRepository = require("./review.repository.js");


class ReviewService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }






async createReview(payload, payloadFiles) {
    const { files } = payloadFiles;
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const reviewData = await this.#repository.createReview(payload);

   
    return reviewData;
  }

  async getAllReview() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

//   async getBannerWithPagination(payload) {
//     const banner = await this.#repository.getBannerWithPagination(payload);
//     return banner;
//   }

  async getSingleReview(id) {
    const reviewData = await this.#repository.findById(id);
    if (!reviewData) throw new NotFoundError("Banner Not Find");
    return reviewData;
  }

  async updateReview(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const reviewData = await this.#repository.updateById(id, payload);
    if (!reviewData) throw new NotFoundError("Banner Not Find");

    if (files.length && reviewData) {
      await removeUploadFile(reviewData?.image);
    }
    return reviewData;
  }

  async deleteProduct(id) {
    const review = await this.#repository.findById(id);
    if (!review) throw new NotFoundError("Banner not found");
    const deleteReview = await this.#repository.deleteById(id);
    if (deleteReview) {
      await removeUploadFile(review?.image);
    }
    return deleteReview;
  }
}

module.exports = new ReviewService(reviewRepository, "review");
