const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
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
    status: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);
artworkSchema.pre('save', async function (next) {
  try {
    if (this.user) {
      const user = await mongoose.model('User').findById(this.user);
      if (user) {
        this.userNickname = user.nickname;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Artwork = mongoose.model("Artwork", artworkSchema);
module.exports = Artwork;