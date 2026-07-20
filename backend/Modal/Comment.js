const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
 descreption:{
    type:String,
    required:true,
    trim:true,
    maxlength:1000
 },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog',
        required:true,
    }
}, {
    timestamps: true,
  })

  module.exports = mongoose.model("comment", CommentSchema);