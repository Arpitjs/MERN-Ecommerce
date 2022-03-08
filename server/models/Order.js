import mongoose from "mongoose";
let { ObjectId } = mongoose.Schema;

let orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'Not Processed',
        enum: [
            'Not Processed', 'Processing', 'Dispatched',
            'Cancelled', 'Completed'
        ]
    },
    orderedBy: {
        type: ObjectId,
        ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

let Order = mongoose.model("Order", orderSchema);

export default Order;
