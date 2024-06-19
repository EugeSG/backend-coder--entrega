import { Schema, model } from "mongoose";

const cartCollectionName = "carts";

const cartSchema = new Schema({
  products: [
    { 
      _id: false,
      quantity: {
        type: Number,
        default: 1
      },
      product : {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ],
}, { versionKey: false });

export const CartModel = model(
  cartCollectionName,
   cartSchema
);