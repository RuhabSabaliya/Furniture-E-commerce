import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-5/12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/Product" className="w-full sm:w-auto text-center bg-white text-emerald-900 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors">
                  Shop Now
                </Link>
                <a href="#team" className="w-full sm:w-auto text-center border-2 border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Our Team
                </a>
              </div>
            </div>
            <div className="md:w-7/12 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img src="images/couch.png" alt="About" className="relative z-10 w-full transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <img src="images/truck.svg" alt="Fast Shipping" className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Fast &amp; Free Shipping</h3>
                    <p className="text-sm text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <img src="images/bag.svg" alt="Easy to Shop" className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Easy to Shop</h3>
                    <p className="text-sm text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <img src="images/support.svg" alt="24/7 Support" className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-sm text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <img src="images/return.svg" alt="Hassle Free Returns" className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Hassle Free Returns</h3>
                    <p className="text-sm text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-100 rounded-2xl transform rotate-3"></div>
                <img
                  src="images/why-choose-us-img.jpg"
                  alt="Why Choose Us"
                  className="relative rounded-2xl shadow-xl w-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Lawson Arnold", role: "CEO, Founder", img: "images/person_1.jpg" },
              { name: "Jeremy Walker", role: "COO", img: "images/person_2.jpg" },
              { name: "Patrik White", role: "CTO", img: "images/person_3.jpg" },
              { name: "Kathryn Ryan", role: "Lead Designer", img: "images/person_4.jpg" }
            ].map((person, index) => (
              <div key={index} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img src={person.img} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" alt={person.name} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  <a href="/" className="hover:text-emerald-900 transition-colors">{person.name}</a>
                </h3>
                <span className="block text-emerald-600 font-medium mb-3">{person.role}</span>
                <p className="text-gray-600 text-sm mb-4">
                  Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics.
                </p>
                <a href="/" className="text-emerald-900 font-bold text-sm hover:underline">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <blockquote className="mb-6 text-gray-600 italic leading-relaxed">
                  “Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.”
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src="images/person-1.png" alt="Maria Jones" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900">Maria Jones</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">CEO, Co-Founder, XYZ Inc.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

