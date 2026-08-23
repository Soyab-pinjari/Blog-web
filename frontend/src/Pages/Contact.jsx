import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Navbar from "../Component/Navbar";

const Contact = () => {
  return (

    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className=" text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-blue-600 text-center">
          <h1 className="text-1xl md:text-5xl font-bold">
            Contact Us
          </h1>
          
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-4 grid lg:grid-cols-2 gap-10">

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Send a Message
          </h2>

          <form className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            
            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-1  outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div>

          <div className="bg-white shadow-lg rounded-xl p-8 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-600">
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">
                    contact@example.com
                  </p>
                </div>
              </div>

            </div>

            {/* Social Icons */}

            <div className="mt-8">
              <h3 className="font-semibold mb-4">
                Follow Us
              </h3>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition"
                >
                  <FaFacebook />
                </a>

                <a
                  href="#"
                  className="bg-pink-500 text-white p-3 rounded-full hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="bg-blue-700 text-white p-3 rounded-full hover:scale-110 transition"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="#"
                  className="bg-gray-900 text-white p-3 rounded-full hover:scale-110 transition"
                >
                  <FaGithub />
                </a>

              </div>

            </div>

          </div>

          {/* Google Map */}


        </div>

      </section>

    </div>
  );
};

export default Contact;