import { Schema, model } from "mongoose";

const mockUserSchema = new Schema({
    password: { type: String, required: true },
    role: { type: String, required: true },
    pets: [String]
});

export const MockUserModel = model("mockUser", mockUserSchema);