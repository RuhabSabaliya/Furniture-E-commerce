import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { addtocart } from '../Slice/cart';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addtowishlist } from '../Slice/wishlist';
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


export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://68e5ef0921dd31f22cc37108.mockapi.io/products/Furnitureapi/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addtocart(product));
      navigate('/Cart');
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(addtowishlist(product));
      navigate('/Wishlist');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-900"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Image Section */}
            <div className="h-96 md:h-full bg-gray-100 flex items-center justify-center p-8">
              <img
                src={getProductImage(product)}
                alt={product.productname || product.name || product.producttitle || product.title}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="uppercase tracking-wide text-sm text-emerald-600 font-bold mb-2">
                Furniture
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.productname || product.name || product.producttitle || product.title}</h1>
              <p className="text-3xl text-emerald-600 font-bold mb-6">{formatPrice(product.productprice ?? product.price)}</p>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Experience comfort and style with our premium {product.productname || product.name || product.producttitle || product.title}.
                Perfect for your home or office, crafted with high-quality materials to ensure durability and elegance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-800 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl hover:border-emerald-900 hover:text-emerald-900 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

