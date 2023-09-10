const mongoose = require("mongoose");

const ai = new mongoose.Schema({
  owner_id: { type: String, required: false },
  guild_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  system_prompt: { type: String, required: false },
  model: { type: String, required: false },
});

module.exports = mongoose.model("ai", ai);
