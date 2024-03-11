import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    lowestPrice: {
      type: Number,
    },
    averagePrice: {
      type: Number,
    },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    heroImage: {
      type: String,
    },
    currency: {
      type: String,
      required: true,
    },
    reviewsCount: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    details: {
      type: String,
    },
    users: [
      {
        email: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
