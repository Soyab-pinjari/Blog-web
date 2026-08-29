import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import userContext from "../../Context/userContext";
import { getProfile } from "../../services/api";
import ProfileTabs from "./ProfileTabs";
const BASE_URL=import.meta.env.VITE_API_URL

function EditProfile() {
  const profileInput = useRef(null);
  const bannerInput = useRef(null);

  const { user, setUser } = useContext(userContext);

  const [profilePreview, setProfilePreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
  console.log(res)
        const updatedUser = res.data.user;

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  // Handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Profile image URL
 const profileImage =user?.profileImage
  ?  user.profileImage
  : `${BASE_URL}/default-avatar.jpg`;

  // Banner image URL
  const bannerImage = user.banner
    ? user.banner
    : `${BASE_URL}/default-banner.jpeg`;

  // Upload profile image
  const handleProfileImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Show preview immediatelyd
    const previewURL = URL.createObjectURL(file);
    setProfilePreview(previewURL);

    const uploadData = new FormData();

    uploadData.append("profileImage", file);

    try {
      const res = await fetch(
        `${BASE_URL}/user/profile-image`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: uploadData,
        }
      );

      const data = await res.json();

      console.log("Profile image response:", data);

      if (data.success && data.user) {
        // Update React user
        setUser(data.user);

        // Update localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Remove preview
        setProfilePreview("");
      }
    } catch (err) {
      console.log("Profile image upload error:", err);
    }
  };

  // Upload banner image
  const handleBannerImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Show preview immediately
    const previewURL = URL.createObjectURL(file);
    setBannerPreview(previewURL);

    const uploadData = new FormData();

    uploadData.append("banner", file);

    try {
      const res = await fetch(
        `${BASE_URL}/user/banner`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: uploadData,
        }
      );
      const data = await res.json();

      console.log("Banner response:", data);

      if (data.success && data.user) {
        // Update React user
        setUser(data.user);

        // Update localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Remove preview
        setBannerPreview("");
      }
    } catch (err) {
      console.log("Banner upload error:", err);
    }
  };

  // Save bio and location
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${BASE_URL}/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Save profile response:", res.data);

      if (res.data.success) {
        const updatedUser = res.data.user;

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setIsEditing(false);
      }
    } catch (err) {
      console.log(
        "Save profile error:",
        err.response?.data || err
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex pt-30 justify-center items-center p-5">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">

        {/* ================= BANNER ================= */}

        <div
          className="h-44 w-full cursor-pointer relative"
          onClick={() => bannerInput.current.click()}
        >
          <img
            src={bannerPreview || bannerImage}
            alt="banner"
            className="w-full h-full object-cover"
          />

          <input
            type="file"
            accept="image/*"
            ref={bannerInput}
            hidden
            onChange={handleBannerImage}
          />
        </div>

        {/* ================= PROFILE SECTION ================= */}

        <div className="relative px-8 pb-8">

          {/* Profile Image */}

          <div className="absolute -top-16 left-8">

            <img
              src={profilePreview || profileImage}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />

            <input
              type="file"
              accept="image/*"
              ref={profileInput}
              hidden
              onChange={handleProfileImage}
            />

            <button
         
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                profileInput.current.click();
              }}
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              ➕
            </button>

          </div>

          {/* ================= USER INFO ================= */}

          <div className="pt-20">

            <h1 className="text-2xl font-bold text-gray-800">
              {user.username}
            </h1>

            {/* ================= BIO ================= */}

            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-5"
                rows={4}
                placeholder="Write something about yourself..."
              />
            ) : (
              <p
                className="mt-5 text-gray-700 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {user.bio || "Click here to add your bio"}
              </p>
            )}

            {/* ================= DETAILS ================= */}

            <div className="flex gap-8 mt-5 text-gray-500 text-sm">

              {/* Location */}

              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="Enter your location"
                />
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  📍 {user.location || "Add location"}
                </span>
              )}

              {/* Joined Date */}

              <span>
                Joined:{" "}
                {user.createdAt &&
                  new Date(user.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
              </span>

            </div>

            {/* ================= SAVE BUTTON ================= */}

            {isEditing && (
              <button
                onClick={saveProfile}
               
                className="mt-4 px-4 py-2 mr-5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            )}

            {/* ================= CREATE BLOG ================= */}

            {!isEditing && (
              <Link
                to="/create"
                className="inline-block mt-8 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Create Blog
              </Link>
            )}

            {/* ================= PROFILE TABS ================= */}

            <ProfileTabs />

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;