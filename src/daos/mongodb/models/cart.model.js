import { Schema, model } from "mongoose";

const cartCollectionName = "carts";

const cartSchema = new Schema({
  products: [
    { 
        type: Object, 
        required: false,
        default: []
    }
  ],
}, { versionKey: false });

export const CartModel = model(
  cartCollectionName,
   cartSchema
);