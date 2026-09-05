import React, { useEffect, useState } from "react";
import { likeBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

function LikeButton({
  blogId,
  likes = 0,
  isLiked = false,
}) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes);
  // const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    setLiked(isLiked);
    setLikesCount(likes);
  }, [isLiked, likes]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // setLikeLoading(true);

      const data = await likeBlog(blogId);

      setLiked(data.liked);
      setLikesCount(data.likesCount);

    } catch (error) {
      console.log("Like error:", error);
    } finally {
      // setLikeLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      // disabled={likeLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      <span
        className={`text-4xl ${
          liked ? "text-red-500" : "text-gray-500"
        }`}
      >
        {liked ? "❤️" : "🤍"}
      </span>

      <span className="text-gray-700 font-medium">
        {likesCount}
      </span>
    </button>
  );
}

export default LikeButton;