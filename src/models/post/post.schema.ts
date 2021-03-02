import { Schema } from "mongoose";
import { USER } from "../../constants";

export const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: USER },
});
