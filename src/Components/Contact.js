import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Contact() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [Emailaddress, setemailaddress] = useState("");
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ApiUrl = 'https://68e5ef0921dd31f22cc37108.mockapi.io/products/Contact';

  const datainsert = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = { fname, lname, Emailaddress, Message };
    try {
      await axios.post(`${ApiUrl}`, res);
      alert("Message sent successfully!");
      Formreset();
    } catch (error) {
      console.log("Info not inserted", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Formreset = () => {
    setfname('');
    setlname('');
    setemailaddress('');
    setMessage('');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/Product" className="w-full sm:w-auto text-center bg-white text-emerald-900 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors">
                  Shop Now
                </Link>
                <a href="#contact-form" className="w-full sm:w-auto text-center border-2 border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Explore
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img src="images/couch.png" alt="Contact" className="relative z-10 w-full transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      <div id="contact-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

            {/* Contact Info */}
            <div className="md:w-1/3 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">43 Raymouth Rd. Baltemoer, London 3910</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@yourdomain.com</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 294 3925 3939</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                <form onSubmit={datainsert} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="fname">First name</label>
                      <input
                        type="text"
                        id="fname"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                        value={fname}
                        onChange={(e) => setfname(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="lname">Last name</label>
                      <input
                        type="text"
                        id="lname"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                      value={Emailaddress}
                      onChange={(e) => setemailaddress(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                      value={Message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-emerald-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-800 transition-all shadow-lg transform active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
