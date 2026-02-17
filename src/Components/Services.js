import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
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

export default function Services() {
  const [products, setProducts] = useState([]);
  const services = [
    { icon: "images/truck.svg", title: "Fast & Free Shipping", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/bag.svg", title: "Easy to Shop", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/support.svg", title: "24/7 Support", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/return.svg", title: "Hassle Free Returns", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/truck.svg", title: "Fast & Free Shipping", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/bag.svg", title: "Easy to Shop", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/support.svg", title: "24/7 Support", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
    { icon: "images/return.svg", title: "Hassle Free Returns", desc: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit." },
  ];
  const fallbackProducts = [
    { name: "Nordic Chair", price: "Rs. 50.00", img: "images/product-1.png" },
    { name: "Kruzo Aero Chair", price: "Rs. 78.00", img: "images/product-2.png" },
    { name: "Ergonomic Chair", price: "Rs. 43.00", img: "images/product-3.png" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://68e5ef0921dd31f22cc37108.mockapi.io/products/Furnitureapi");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-5/12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <div className="flex gap-4">
                <Link to="/Product" className="bg-white text-emerald-900 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors">
                  Shop Now
                </Link>
                <a href="#services" className="border-2 border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Explore
                </a>
              </div>
            </div>
            <div className="md:w-7/12 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <img src="images/couch.png" alt="Services" className="relative z-10 w-full transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="mb-4 relative">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-900 transition-colors duration-300">
                    <img src={service.icon} alt={service.title} className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Highlight Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/4 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Crafted with excellent material.</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <Link to="/Product" className="bg-emerald-900 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-800 transition-colors inline-block">
                Explore
              </Link>
            </div>

            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {(products.length ? products.slice(0, 3) : fallbackProducts).map((product, idx) => {
                const productName = product.productname || product.name || product.producttitle || product.title || "Product";
                return (
                <div key={idx} className="group relative text-center">
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="bg-emerald-900 text-white p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <img src="images/cross.svg" className="w-4 h-4 invert" alt="View" />
                      </span>
                    </div>
                    <img src={getProductImage(product)} alt={productName} className="w-3/4 object-contain transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{productName}</h3>
                  <strong className="text-xl font-bold text-emerald-900">{formatPrice(product.productprice ?? product.price)}</strong>
                </div>
              );
              })}
            </div>
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

