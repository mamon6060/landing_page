
const { productSchema } = require("../../models/product/productSchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class ProductRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }



  async createProduct(payload) {
    console.log(payload);
    const newProduct = await productSchema.create(payload);
    return newProduct;
  }




  async getAllProduct(payload) {
    try {
      const products = await pagination(payload, async () => {
        const products = await this.#model.find({
        })
        
        .populate('') 
        // .populate('') 
        const totalBanner = await this.#model.countDocuments();

        return { doc: products, totalDoc: totalBanner };
      });

      return products;
    } catch (error) {
      console.error("Error getting products with pagination:", error);
      throw error;
    }
  }
  async getProductWithPagination(payload) {
    try {
      const products = await pagination(payload, async (limit, offset, sortOrder) => {
        const products = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalBanner = await this.#model.countDocuments();

        return { doc: products, totalDoc: totalBanner };
      });

      return products;
    } catch (error) {
      console.error("Error getting products with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new ProductRepository(productSchema);

