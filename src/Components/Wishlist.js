import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { removewishlistitem, clearwishlist } from '../Slice/wishlist'
import { addtocart } from '../Slice/cart'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
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


export default function Wishlist() {
  const wishlistitem = useSelector((state) => state.wishlist?.wishlistitem) ?? []
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Wishlist</h1>
      </div>

      <div className="flex-grow container mx-auto px-4 py-12">
        {wishlistitem.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your wishlist is empty</h2>
            <Link to="/Product" className="inline-block bg-emerald-900 text-white px-8 py-3 rounded-xl hover:bg-emerald-800 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 max-w-4xl mx-auto">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-gray-700 font-semibold text-sm uppercase border-b">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Price</div>
              <div className="col-span-3 text-center">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
              {wishlistitem.map((item) => (
                <div key={item.id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">

                  {/* Product Info */}
                  <div className="col-span-6 w-full flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg p-2">
                      <img
                        src={getProductImage(item)}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-3 w-full md:text-center text-gray-600 font-medium">
                    <span className="block text-xs uppercase tracking-wide text-gray-400 md:hidden mb-1">Price</span>
                    {formatPrice(item.price)}
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 w-full flex flex-wrap md:flex-nowrap justify-start md:justify-center gap-2">
                    <Link
                      to={`/Productdetail/${item.id}`}
                      className="w-full sm:w-auto text-center bg-emerald-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => dispatch(addtocart(item))}
                      className="w-full sm:w-auto text-center bg-emerald-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => dispatch(removewishlistitem(item.id))}
                      className="w-full sm:w-auto text-center bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Link to="/Product" className="text-emerald-900 font-semibold hover:underline">
                &larr; Continue Shopping
              </Link>
              <button
                onClick={() => dispatch(clearwishlist())}
                className="w-full sm:w-auto text-gray-500 hover:text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

