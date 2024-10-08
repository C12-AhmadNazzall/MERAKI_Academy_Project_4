const mongoose = require("mongoose");
const postsSchema = mongoose.Schema({
  paragraph: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  likes: { type: Number },
});
module.exports = mongoose.model("posts", postsSchema);
