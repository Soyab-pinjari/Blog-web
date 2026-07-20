const { default: mongoose, mongo, Mongoose } = require("mongoose");


const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
         maxlength: 150,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImage: {
      type: String,
      default: "",
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
         required: true,
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref:'Category',
      type:String,
      // required: true,
      trim: true,
    },

    views: {
      type: Number,
      default: 0,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
      comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
}, {
    timestamps: true,
  })


  module.exports = mongoose.model('Blog',BlogSchema);