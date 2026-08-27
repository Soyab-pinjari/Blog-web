// getProfile
// updateProfile
// uploadAvatar
// followUser
// unfollowUser
// getUserBlogs
const User = require('../Modal/Users')
const uploadToCloudinary = require('../Utils/uploadToCloudinary')

const getProfile = async (req, res) => {
  console.log("blogs")
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const authorInfo = async(req,res)=>{
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    res.status(200).json({success: true,
      user});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}
const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No profile image uploaded",
      });
    }

    const userId = req.user.userId;
  console.log("USER ID:", userId);
    console.log("FILE:", req.file);
    console.log("BUFFER SIZE:", req.file.buffer?.length);
    // Upload image to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      "blog-app/profiles"
    );
console.log("☁️ CLOUDINARY RESULT:", result);
    // Save Cloudinary URL in MongoDB
    const user = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: result.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user,
    });
  } catch (error) {
    console.log("Profile image upload error:", error);
 console.error("❌ PROFILE IMAGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No banner uploaded",
      });
    }

    const userId = req.user.userId;

    // Upload banner to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      "blog-app/banners"
    );

    // Save Cloudinary URL in MongoDB
    const user = await User.findByIdAndUpdate(
      userId,
      {
        banner: result.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      user,
    });
    console.log("Cloudinary result:", result);
  } catch (error) {
    console.log("Banner upload error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { bio, location } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        bio,
        location,
      },
      { new: true }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
    
  } catch (error) {
    console.log(error); 
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};





module.exports = {updateBanner,updateProfileImage,getProfile,updateProfile, authorInfo};