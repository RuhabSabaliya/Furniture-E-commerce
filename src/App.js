import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './Components/Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Shop from './Components/Shop';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import ProductDetail from './Components/ProductDetail';
import About from './Components/About';
import Services from './Components/Services';
import Wishlist from './Components/Wishlist';
import Checkout from './Components/Checkout';
import Blog from './Components/Blog';

import store from './Slice/Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Product" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Productdetail/:id" element={<ProductDetail />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Blog" element={<Blog />} />
        </Routes>
      </Router>
    </Provider>
  );
}
