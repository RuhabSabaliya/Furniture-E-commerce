import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "First Time Home Owner Ideas",
            author: "Kristin Watson",
            date: "Dec 19, 2021",
            image: "images/post-1.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        },
        {
            id: 2,
            title: "How To Keep Your Furniture Clean",
            author: "Robert Fox",
            date: "Dec 15, 2021",
            image: "images/post-2.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        },
        {
            id: 3,
            title: "Small Space Furniture Apartment Ideas",
            author: "Kristin Watson",
            date: "Dec 12, 2021",
            image: "images/post-3.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        },
        {
            id: 4,
            title: "Kitchen Island Ideas",
            author: "Kristin Watson",
            date: "Dec 10, 2021",
            image: "images/post-1.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        },
        {
            id: 5,
            title: "Furniture Color Combinations",
            author: "Robert Fox",
            date: "Dec 05, 2021",
            image: "images/post-2.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        },
        {
            id: 6,
            title: "Living Room Decor Tips",
            author: "Kristin Watson",
            date: "Dec 01, 2021",
            image: "images/post-3.jpg",
            excerpt: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="bg-emerald-900 py-20 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
                    <p className="text-emerald-100 text-lg leading-relaxed max-w-2xl">
                        Read our latest news, updates, and stories.
                    </p>
                </div>
            </div>

            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <div key={post.id} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-emerald-900">
                                        {post.date}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                    {post.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                                    <span className="font-semibold text-emerald-600">{post.author}</span>
                                    <span>•</span>
                                    <span>5 min read</span>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>

                                <span className="inline-flex items-center text-emerald-900 font-bold hover:underline">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
