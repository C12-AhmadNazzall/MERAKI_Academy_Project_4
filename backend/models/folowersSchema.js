const mongoose = require('mongoose')
const followerSchema = mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"}
    , image : {type : String}
})
module.exports = mongoose.model("followers",followerSchema)