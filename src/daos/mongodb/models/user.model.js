import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: false },
  password: { type: String, require: true },
  cartId: { type: Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, require: true, default: "user" }
  
});

export const userModel = model("users", userSchema);