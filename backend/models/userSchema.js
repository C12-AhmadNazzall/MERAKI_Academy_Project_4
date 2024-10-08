const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema({
  userName: { type: String },

  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  followers: { type: mongoose.Schema.Types.ObjectId, ref: "followers" },

  Posts: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },

  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },

  image: { type: String },
});
usersSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 3);
});
module.exports = mongoose.model("User", usersSchema);
