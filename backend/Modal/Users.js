const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,  
        required:true,
         minlength: 6,
    },
    profileImage:{
    type:String,
    default:""
    },
    
    bio:{
     type: String,
      default: "",
      maxlength: 250,
    },
    banner:{
      type:String,
      default:""
    },
    location:{
        type:String,
        default:"",
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },  
},
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);


module.exports = mongoose.model('User',UserSchema);