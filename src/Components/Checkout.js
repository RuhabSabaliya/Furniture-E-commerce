import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { clearcart } from "../Slice/cart";
import { useNavigate } from "react-router-dom";
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


export default function Checkout() {
  const cartitem = useSelector((state) => state.cart?.cartitem) ?? [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "1",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: ""
  });

  const totalAmount = cartitem.reduce(
    (total, item) => total + parsePrice(getItemPrice(item)) * (item.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.firstName || !formData.address || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Order Placed Successfully!");
    dispatch(clearcart());
    navigate("/"); // Redirect to home
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-emerald-900 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
      </div>

      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Billing Details */}
          <div className="lg:w-7/12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Details</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Country <span className="text-red-500">*</span></label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1">Select a country</option>
                    <option value="2">United States</option>
                    <option value="3">Canada</option>
                    <option value="4">United Kingdom</option>
                    <option value="5">Australia</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Order Notes</label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-5/12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Order</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-semibold text-gray-700">Product</th>
                      <th className="pb-3 font-semibold text-gray-700 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartitem.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4 text-gray-600">
                          {getItemName(item)} <strong className="text-gray-900 mx-2">x {item.quantity}</strong>
                        </td>
                        <td className="py-4 text-gray-900 font-medium text-right">
                          {formatPrice((parsePrice(getItemPrice(item)) * (item.quantity || 1)).toFixed(2))}
                        </td>
                      </tr>
                    ))}

                    <tr className="border-t border-gray-200">
                      <td className="py-4 font-bold text-gray-900">Order Total</td>
                      <td className="py-4 font-bold text-emerald-600 text-xl text-right">{formatPrice(totalAmount.toFixed(2))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 mb-8">
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="payment" className="h-5 w-5 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                  <span className="font-medium text-gray-900">Direct Bank Transfer</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="payment" className="h-5 w-5 text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-medium text-gray-900">Cheque Payment</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="payment" className="h-5 w-5 text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-medium text-gray-900">Paypal</span>
                </label>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

