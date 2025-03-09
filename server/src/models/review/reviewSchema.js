
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewsSchema = new Schema(
  {
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const reviewSchema = model("review", reviewsSchema);
module.exports = reviewSchema;
