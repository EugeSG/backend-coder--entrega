//[{"id":1,"title":"Almendras","description":"Almendras Non Pareil","price":20000,"thumbnail":[" thum"],"code":"FSA","stock":10}

import { Schema, model } from "mongoose";

const productCollectionName = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: {type: String, required: false}
}, { versionKey: false });

export const ProductModel = model(
  productCollectionName,
  productSchema
);