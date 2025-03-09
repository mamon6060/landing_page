


const { OrderSchema } = require("../../models/order/orderSchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class OrderRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }



  async createOrder(payload) {
    console.log(payload);
    const newOrder = await OrderSchema.create(payload);
    return newOrder;
  }




  async getAllOrders(payload) {
    try {
      const order = await pagination(payload, async () => {
        const order = await this.#model.find({
        })
          
        .populate('') 
        // .populate('') 
        const totalOrder = await this.#model.countDocuments();

        return { doc: order, totalDoc: totalOrder };
      });

      return order;
    } catch (error) {
      console.error("Error getting all order", error);
      throw error;
    }
  }
  async getOrderWithPagination(payload) {
    try {
      const order = await pagination(payload, async (limit, offset, sortOrder) => {
        const order = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        .populate('') 
        // .populate('') 
        const totalOrder = await this.#model.countDocuments();

        return { doc: order, totalDoc: totalOrder };
      });

      return order;
    } catch (error) {
      console.error("Error getting order with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new OrderRepository(OrderSchema);

