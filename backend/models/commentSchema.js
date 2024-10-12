const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: { type: String },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post : {type: mongoose.Schema.Types.ObjectId,
    ref: "posts",}
});
module.exports = mongoose.model("comments", commentSchema);
