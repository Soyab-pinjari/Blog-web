import React from "react";
import { Link } from "react-router-dom";
import {
  PenLine,
  BookOpen,
  Users,
  Search,
  UserPlus,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: PenLine,
      title: "Write & Share",
      description:
        "Turn your knowledge, experiences and ideas into meaningful blog posts.",
    },
    {
      icon: BookOpen,
      title: "Discover Content",
      description:
        "Explore interesting articles and learn something new from different writers.",
    },
    {
      icon: Users,
      title: "Build Community",
      description:
        "Connect readers and writers through ideas, experiences and knowledge.",
    },
    {
      icon: Search,
      title: "Explore Topics",
      description:
        "Find content easily through categories and topics that interest you.",
    },
  ];


  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Programming",
    "Business",
    "Entertainment",
    "Health",
  ];

  return (
    <div className="bg-white  pt-20  text-slate-900">

    
      {/* What is Blogy */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-blue-600 font-semibold mb-3">
            WHAT IS BLOGY?
          </p>

          <h2 className="text-4xl font-bold">
            A place for readers and writers
          </h2>

          <p className="text-slate-500 text-lg leading-8 mt-6 max-w-3xl mx-auto">
            Blogy is a community-driven blogging platform designed to
            make sharing knowledge simple and enjoyable. Whether you
            love technology, travel, business, lifestyle or programming,
            Blogy gives you a place to read, learn and share.
          </p>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-3">
            WHY BLOGY?
          </p>

          <h2 className="text-4xl font-bold">
            Everything you need to share ideas
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={23} />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-500 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

     

      {/* Categories */}
      {/* <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold mb-3">
            EXPLORE
          </p>

          <h2 className="text-4xl font-bold">
            Explore different topics
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category.toLowerCase()}`}
              className="px-6 py-3 rounded-full border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition"
            >
              {category}
            </Link>
          ))}
        </div>

      </section> */}

      {/* CTA */}
      {/* <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-blue-600 rounded-3xl px-8 py-14 md:px-16 text-center text-white">

          <h2 className="text-4xl font-bold">
            Have an idea worth sharing?
          </h2>

          <p className="text-blue-100 text-lg mt-4 max-w-2xl mx-auto">
            Your next story could inspire someone. Start writing
            and share your ideas with the Blogy community.
          </p>

          <Link
            to="/create-blog"
            className="inline-block mt-8 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Start Writing
          </Link>

        </div>

      </section> */}

    </div>
  );
};

export default About;