const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productschema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
   
    price: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    offer: {
        type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.model("product", productschema);


module.exports = { productSchema };

