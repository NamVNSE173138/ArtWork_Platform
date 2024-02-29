const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
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
// artworkSchema.virtual('userDetails', {
//   ref: 'User', // This assumes your user model is named 'User'
//   localField: 'user',
//   foreignField: '_id',
//   justOne: true
// });
const Artwork = mongoose.model("Artwork", artworkSchema);
module.exports = Artwork;