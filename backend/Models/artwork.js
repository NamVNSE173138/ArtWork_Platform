const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    artworkId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    artworkName: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    numOfLike: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    describe: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.model("Artwork", artworkSchema);
module.exports = Artwork;