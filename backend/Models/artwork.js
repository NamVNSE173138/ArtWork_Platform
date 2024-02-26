const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
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
      type: Number,
      required: false,
    },
    description: {
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