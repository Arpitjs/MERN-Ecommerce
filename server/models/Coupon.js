import mongoose from "mongoose";

let couponSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            unique: true,
            required: 'Name is required',
            uppercase: true,
            minlength: [6, 'coupon is too short'],
            maxlength: [12, 'coupon is too long']
        },
        expiry: {
            type: Date,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    },
  {
    timestamps: true,
  }
);

let Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
