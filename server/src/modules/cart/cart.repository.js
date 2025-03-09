

const { CartSchema } = require("../../models/cart/cartSchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class CartRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }



  async createCart(payload) {
    console.log(payload);
    const newCart = await CartSchema.create(payload);
    return newCart;
  }




  async getAllCarts(payload) {
    try {
      const cart = await pagination(payload, async () => {
        const cart = await this.#model.find({
        })
          
        .populate('') 
        // .populate('') 
        const totalCart = await this.#model.countDocuments();

        return { doc: cart, totalDoc: totalCart };
      });

      return cart;
    } catch (error) {
      console.error("Error getting all cart", error);
      throw error;
    }
  }
  async getCartWithPagination(payload) {
    try {
      const cart = await pagination(payload, async (limit, offset, sortOrder) => {
        const cart = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalCart = await this.#model.countDocuments();

        return { doc: cart, totalDoc: totalCart };
      });

      return cart;
    } catch (error) {
      console.error("Error getting cart with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new CartRepository(CartSchema);

