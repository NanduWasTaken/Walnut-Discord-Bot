import { Schema, model } from "mongoose";

const guild = new Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  ownerId: {
    type: String,
  },
});

export default model("Guild", guild);
