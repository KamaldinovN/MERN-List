import { Schema, model } from "mongoose";

const User = new Schema({
  name: { type: String, require: true },
  rank: { type: Number, require: true },
});

export default model("User", User);
