
import React, { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

function LikeButton({ blogId, likes = 0, isLiked = false }) {
const [liked, setLiked] = useState(false);
const [likesCount, setLikesCount] = useState(0);
const [likeLoading, setLikeLoading] = useState(false);
const handleLike = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLikeLoading(true);

    const data = await likeBlog(blog._id);

    setLiked(data.liked);
    setLikesCount(data.likesCount);

  } catch (error) {
    console.log("Like error:", error);
  } finally {
    setLikeLoading(false);
  }
};
  return (
   <button
  onClick={handleLike}
  disabled={likeLoading}
  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
>
 <span
  className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"}`}
>
  {liked ? "❤️" : "🤍"}
</span>

  <span>
    {likesCount}
  </span>
</button>
  );
}

export default LikeButton;

