const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "product" },

    quantity: { type: Number, default: 1 },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CartSchema = mongoose.model("cart", CartsSchema);

module.exports = { CartSchema };