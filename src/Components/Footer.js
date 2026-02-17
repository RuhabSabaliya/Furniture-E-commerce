import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12 mt-auto">
            <div className="container mx-auto px-4 relative">

                {/* Sofa Image Decoration */}
                <div className="hidden lg:block absolute -top-48 right-10 w-64 xl:w-80 pointer-events-none">
                    <img src="images/sofa.png" alt="Sofa" className="w-full h-auto drop-shadow-xl transform hover:-translate-y-2 transition-transform duration-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-8">
                        {/* Newsletter */}
                        <div className="mb-12">
                            <h3 className="flex items-center gap-3 text-2xl font-bold text-emerald-900 mb-6">
                                <span className="bg-emerald-100 p-2 rounded-full">
                                    <img src="images/envelope-outline.svg" alt="Email" className="w-6 h-6" />
                                </span>
                                <span>Subscribe to Newsletter</span>
                            </h3>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg">
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Enter your name"
                                />
                                <input
                                    type="email"
                                    className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                                <button className="bg-emerald-900 text-white p-3 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-gray-100 pt-16">
                    <div>
                        <Link to="/" className="text-3xl font-bold text-emerald-900 mb-4 block">
                            Furni<span className="text-gray-400">.</span>
                        </Link>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                            quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                            vulputate velit imperdiet dolor tempor tristique.
                        </p>
                        <div className="flex gap-4">
                            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((social) => (
                                <a key={social} href="/" className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all duration-300">
                                    {/* Placeholder icons since Font Awesome might not be available */}
                                    <span className="font-bold text-sm">{social.charAt(0).toUpperCase()}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><Link to="/About" className="hover:text-emerald-900 transition-colors">About us</Link></li>
                            <li><Link to="/Services" className="hover:text-emerald-900 transition-colors">Services</Link></li>
                            <li><Link to="/Blog" className="hover:text-emerald-900 transition-colors">Blog</Link></li>
                            <li><Link to="/Contact" className="hover:text-emerald-900 transition-colors">Contact us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Support</a></li>
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Knowledge base</a></li>
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Live chat</a></li>
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Jobs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Products</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Nordic Chair</a></li>
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Kruzo Aero</a></li>
                            <li><a href="/" className="hover:text-emerald-900 transition-colors">Ergonomic Chair</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-16 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p className="text-center md:text-left">
                            Copyright © {new Date().getFullYear()}. All Rights Reserved. — Designed with love by Untree.co
                        </p>
                        <div className="flex gap-6">
                            <a href="/" className="hover:text-emerald-900 transition-colors">Terms &amp; Conditions</a>
                            <a href="/" className="hover:text-emerald-900 transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

