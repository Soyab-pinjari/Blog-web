const { default: mongoose } = require("mongoose")


const CategorySchema = new mongoose.Schema({
    name:{
         type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
    },
     slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
      icon: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "#6366F1",
    },
   
},  {
    timestamps: true,
  })

  module.exports = mongoose.model('Category',CategorySchema);