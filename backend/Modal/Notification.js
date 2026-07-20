const { default: mongoose } = require("mongoose");


const NotificationSchema=new mongoose.Schema({
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
           required: true,
    },
      sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
   comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },

    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },
   
      isRead: {
      type: Boolean,
      default: false,
    },
},  {
    timestamps: true,
  }
)

module.exports = mongoose.model('notification',NotificationSchema);