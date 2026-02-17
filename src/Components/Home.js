import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
const normalizeImageValue = (value) => {
  if (!value) return "";

  if (Array.isArray(value)) {
    for (const entry of value) {
      const normalized = normalizeImageValue(entry);
      if (normalized) return normalized;
    }
    return "";
  }

  if (typeof value === "object") {
    return normalizeImageValue(
      value.url ??
        value.src ??
        value.path ??
        value.link ??
        value.href ??
        value.image ??
        value.thumbnail ??
        value.imageUrl ??
        value.imageURL ??
        value.original ??
        value.large ??
        value.medium ??
        value.small
    );
  }

  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("data:") ||
    lower.startsWith("blob:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `/${trimmed}`;
};

const getProductImage = (product) => {
  if (!product) return "";
  if (typeof product === "string" || Array.isArray(product)) {
    return normalizeImageValue(product);
  }

  const candidates = [
    product.ProductImage,
    product.productimage,
    product.productImage,
    product.product_image,
    product.productimageurl,
    product.productImageUrl,
    product.image,
    product.img,
    product.thumbnail,
    product.photo,
    product.picture,
    product.imageUrl,
    product.imageURL,
    product.image_url,
    product.imageurl,
    product.photoUrl,
    product.thumbnailUrl,
    product.avatar,
    product.cover,
    product.pictureUrl,
    product.images,
    product.gallery
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageValue(candidate);
    if (normalized) return normalized;
  }

  return "";
};

const formatPrice = (price) => {
  if (price === null || price === undefined) return "Rs. 0.00";
  const normalized = String(price).replace(/,/g, "");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  if (!match) return "Rs. 0.00";
  return `Rs. ${match[0]}`;
};


export default function Home() {
  const [apidata, setapidata] = useState([]);
  const fallbackProducts = [
    { name: "Nordic Chair", price: "Rs. 50.00", img: "images/product-1.png" },
    { name: "Kruzo Aero Chair", price: "Rs. 78.00", img: "images/product-2.png" },
    { name: "Ergonomic Chair", price: "Rs. 43.00", img: "images/product-3.png" }
  ];

  const apidatafetch = async () => {
    try {
      const response = await axios.get("https://68e5ef0921dd31f22cc37108.mockapi.io/products/Furnitureapi")
      setapidata(response.data)
    }
    catch (error) {
      console.log("Data not fetch in home page")
    }
  };

  useEffect(() => {
    apidatafetch()
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-14 sm:py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="lg:w-5/12 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Modern Interior <span className="block text-emerald-200">Design Studio</span>
              </h1>
              <p className="mb-8 text-lg text-emerald-100 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                tristique.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/Product" className="w-full sm:w-auto text-center px-8 py-3 bg-yellow-400 text-emerald-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-lg">
                  Shop Now
                </Link>
                <Link to="/Product" className="w-full sm:w-auto text-center px-8 py-3 border-2 border-emerald-200 text-white font-bold rounded-full hover:bg-emerald-800 hover:border-emerald-800 transition-colors">
                  Explore
                </Link>
              </div>
            </div>
            <div className="lg:w-7/12 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img src="images/couch.png" className="relative z-10 w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" alt="Couch" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlight Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">

            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Crafted with excellent material.
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <Link to="/Product" className="inline-block px-8 py-3 bg-emerald-900 text-white font-bold rounded-full hover:bg-emerald-800 transition-colors shadow-md">
                Explore
              </Link>
            </div>

            {(apidata.length ? apidata.slice(0, 3) : fallbackProducts).map((product, idx) => {
              const productName = product.productname || product.name || product.producttitle || product.title || "Product";
              return (
              <div key={idx} className="group relative text-center">
                <Link to="/Product" className="block">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors duration-300">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={getProductImage(product)}
                      className="w-3/4 object-contain transform group-hover:scale-110 transition-transform duration-500"
                      alt={productName}
                    />
                    <div className="absolute bottom-4 right-4 bg-emerald-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <img src="images/cross.svg" className="w-4 h-4 invert" alt="Add" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{productName}</h3>
                  <strong className="block text-xl font-bold text-emerald-600 mt-1">{formatPrice(product.productprice ?? product.price)}</strong>
                </Link>
              </div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us</h2>
              <p className="mb-10 text-gray-600 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Fast & Free Shipping", icon: "images/truck.svg" },
                  { title: "Easy to Shop", icon: "images/bag.svg" },
                  { title: "24/7 Support", icon: "images/support.svg" },
                  { title: "Hassle Free Returns", icon: "images/return.svg" }

                ].map((feature, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4 bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center text-emerald-900">
                      <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-5/12">
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-200 rounded-2xl transform -rotate-2"></div>
                <img
                  src="images/why-choose-us-img.jpg"
                  alt="Why Choose Us"
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* We Help Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="lg:w-7/12 order-2 lg:order-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
                  <img src="images/img-grid-1.jpg" alt="Interior 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img src="images/img-grid-2.jpg" alt="Interior 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img src="images/img-grid-3.jpg" alt="Interior 3" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                We Help You Make Modern Interior Design
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique. Pellentesque
                habitant morbi tristique senectus et netus et malesuada
              </p>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Donec vitae odio quis nisl dapibus malesuada
                  </li>
                ))}
              </ul>
              <Link to="/Product" className="inline-block px-8 py-3 bg-emerald-900 text-white font-bold rounded-full hover:bg-emerald-800 transition-colors shadow-md">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Product Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Nordic Chair", img: "images/product-1.png" },
              { name: "Kruzo Aero Chair", img: "images/product-2.png" },
              { name: "Ergonomic Chair", img: "images/product-3.png" }
            ].map((product, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={product.img} alt={product.name} className="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio</p>
                  <Link to="/Product" className="text-emerald-700 font-bold text-sm hover:underline">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
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

      {/* Recent Blog */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Blog</h2>
            <Link to="/Blog" className="self-start sm:self-auto text-emerald-700 font-bold hover:text-emerald-900 hover:underline">
              View All Posts
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "First Time Home Owner Ideas", img: "images/post-1.jpg", author: "Kristin Watson", date: "Dec 19, 2021" },
              { title: "How To Keep Your Furniture Clean", img: "images/post-2.jpg", author: "Robert Fox", date: "Dec 15, 2021" },
              { title: "Small Space Furniture Apartment Ideas", img: "images/post-3.jpg", author: "Kristin Watson", date: "Dec 12, 2021" }
            ].map((post, idx) => (
              <Link to="/Blog" key={idx} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

