const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
  
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
  
      address: {
        type: String,
        // required: [true, "Email is required"],
      },
      shippingCost: {
        type: Number,
        required: [true, "Shipping cost is required"],
      },
  
      totalCost: {
        type: Number,
        default: 0,
      },
  
      orderStatus: {
        type: String,
        enum: {
          values: ["pending", "approved", "shipped", "delivered", "canceled"],
          message: "{VALUE} is not supported, Enter a valid order status",
        },
        default: "pending",
      },

      products: [
        {
          productRef: {
            type: Schema.Types.ObjectId, // Product Option ID
           ref: "product",
            required: [true, "Product is required"],
          },
  
          quantity: {
            type: Number,
            required: [true, "Quantity is required"],
          },
        },
      ],
    
  
    },
    {
      timestamps: true,
    }
  );

const OrderSchema = mongoose.model("order",  OrdersSchema);

module.exports = { OrderSchema };