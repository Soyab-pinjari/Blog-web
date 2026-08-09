import React from 'react'
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

function Steps() {
    const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create an Account",
      description: "Join Blogy and become part of our growing community.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Write Your Blog",
      description: "Share your thoughts, knowledge and experiences with others.",
    },
    {
      number: "03",
      icon: Send,
      title: "Publish",
      description: "Publish your article and make your ideas available to readers.",
    },
    {
      number: "04",
      icon: Sparkles,
      title: "Get Discovered",
      description: "Let readers discover your content and learn from your ideas.",
    },
  ];
  return (
    <div>
       {/* How it works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold mb-3">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl font-bold">
              From idea to published story
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-7 border border-slate-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                      <Icon size={20} />
                    </div>

                    <span className="text-3xl font-bold text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 leading-7">
                    {step.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  )
}

export default Steps
