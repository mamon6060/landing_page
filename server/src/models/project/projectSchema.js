const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Projectschema = new Schema(
  {
    image: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "COMPLETED"],
      default: "UPCOMING",
    },
    serviceRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ProjectSchema = mongoose.model("Project", Projectschema);

module.exports = { ProjectSchema };
