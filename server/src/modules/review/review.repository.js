


const reviewSchema = require("../../models/review/reviewSchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class reviewRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }



  async createReview(payload) {
    console.log(payload);
    const newReview = await reviewSchema.create(payload);
    return newReview;
  }




  async getReviewWithPagination(payload) {
    try {
      const review = await pagination(payload, async (limit, offset, sortOrder) => {
        const review = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalReview = await this.#model.countDocuments();

        return { doc: review, totalDoc: totalReview };
      });

      return review;
    } catch (error) {
      console.error("Error getting review with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new reviewRepository(reviewSchema);

