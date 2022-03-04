import mongoose from "mongoose";
let { ObjectId } = mongoose.Schema;

let cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: {
      type: ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

let Cart = mongoose.model("Cart", cartSchema);

export default Cart;
