const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: { type: String },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("comments", commentSchema);
