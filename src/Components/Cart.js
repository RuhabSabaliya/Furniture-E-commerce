import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { removecartitem, incrementqty, decrementqty, clearcart } from "../Slice/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const parsePrice = (price) => {
  if (price === null || price === undefined) return 0;
  const normalized = String(price).replace(/,/g, "");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const getItemPrice = (item) => item?.price ?? item?.productprice ?? item?.productPrice ?? 0;
const getItemName = (item) => item?.name ?? item?.productname ?? item?.producttitle ?? item?.title ?? "Product";


export default function Cart() {
  const cartitem = useSelector((state) => state.cart?.cartitem) ?? [];
  const dispatch = useDispatch();

  const totalAmount = cartitem.reduce(
    (total, item) => total + parsePrice(getItemPrice(item)) * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Cart</h1>
      </div>

      <div className="flex-grow container mx-auto px-4 py-12">
        {cartitem.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your cart is empty</h2>
            <Link to="/Product" className="inline-block bg-emerald-900 text-white px-8 py-3 rounded-xl hover:bg-emerald-800 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-gray-700 font-semibold text-sm uppercase border-b">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartitem.map((item) => {
                    const lineTotal = parsePrice(getItemPrice(item)) * (item.quantity || 1);
                    return (
                      <div key={item.id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">

                      {/* Product Info */}
                      <div className="col-span-6 w-full flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg p-2">
                          <img
                            src={getProductImage(item)}
                            alt={getItemName(item)}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{getItemName(item)}</h3>
                          <button
                            onClick={() => dispatch(removecartitem(item.id))}
                            className="text-red-500 text-sm hover:text-red-700 mt-1 flex items-center gap-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 w-full md:text-center text-gray-600 font-medium">
                        <span className="block text-xs uppercase tracking-wide text-gray-400 md:hidden mb-1">Price</span>
                        {formatPrice(getItemPrice(item))}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 w-full md:w-auto">
                        <span className="block text-xs uppercase tracking-wide text-gray-400 md:hidden mb-1">Quantity</span>
                        <div className="flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden w-24 mx-0 md:mx-auto">
                          <button
                            onClick={() => dispatch(decrementqty(item.id))}
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(incrementqty(item.id))}
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 w-full md:text-center font-bold text-gray-900">
                        <span className="block text-xs uppercase tracking-wide text-gray-400 md:hidden mb-1">Total</span>
                        {formatPrice(lineTotal.toFixed(2))}
                      </div>

                    </div>
                  );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <Link to="/Product" className="text-emerald-900 font-semibold hover:underline">
                  &larr; Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearcart())}
                  className="w-full sm:w-auto text-gray-500 hover:text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Cart Totals</h2>

                <div className="flex justify-between items-center mb-4 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(totalAmount.toFixed(2))}</span>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <div className="flex justify-between items-center mb-8 text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount.toFixed(2))}</span>
                </div>

                <Link
                  to="/Checkout"
                  className="block w-full bg-emerald-900 text-white text-center font-bold py-4 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

