import React from "react";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 mt-10">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div>
          <p className="flex items-center gap-2 text-gray-600 font-medium mb-5">
            <span className="text-blue-600 text-xl">✦</span>
            Welcome to Blogy
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Discover. Read. Share
            <br />
            <span className="text-blue-600">Your Ideas.</span>
          </h1>

          <p className="mt-6 text-gray-500 text-lg leading-8 max-w-lg">
            Read insightful articles on technology, lifestyle, travel and
            more. Join our community of writers and readers.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              Explore Blogs
            </button>

            <button className="border-2 border-blue-500 text-gray-800 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition">
              Start Writing
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="/hero.jpeg"
            alt="Travel"
            className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
          />

          {/* Floating Card */}
          {/* <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 w-[320px] flex items-center gap-4">
            <img
              src="/profile.jpg"
              alt="profile"
              className="w-16 h-16 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold text-gray-800">
                How I Travel Solo
                <br />
                And Love Every Minute
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                👤 Jane Cooper • 5 min read
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;