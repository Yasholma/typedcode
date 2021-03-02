import { Schema } from "mongoose";

export const AddressSchema = new Schema({
  city: String,
  state: String,
});

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: AddressSchema,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
