import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const isActive = (path) => {
        return location.pathname === path ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300 hover:text-white';
    };

    return (
        <nav className="bg-emerald-900 sticky top-0 z-50 shadow-md" aria-label="Furni navigation bar">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link className="text-2xl font-bold text-white tracking-tight" to="/">
                        Furni<span className="text-gray-400">.</span>
                    </Link>

                    <button
                        className="lg:hidden text-white focus:outline-none"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>

                    <div className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full absolute lg:static top-full left-0 bg-emerald-900 lg:bg-transparent p-4 lg:p-0 border-t border-emerald-800 lg:border-0`}>
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 text-base font-medium">
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/')}`} to="/" onClick={() => setIsOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/Product')}`} to="/Product" onClick={() => setIsOpen(false)}>
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/About')}`} to="/About" onClick={() => setIsOpen(false)}>
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/Services')}`} to="/Services" onClick={() => setIsOpen(false)}>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/Blog')}`} to="/Blog" onClick={() => setIsOpen(false)}>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link className={`block py-1 transition-colors ${isActive('/Contact')}`} to="/Contact" onClick={() => setIsOpen(false)}>
                                    Contact us
                                </Link>
                            </li>
                        </ul>

                        <ul className="flex flex-row space-x-6 mt-4 lg:mt-0 lg:ml-8 items-center">
                            <li>
                                <Link className="nav-link block hover:opacity-80 transition-opacity" to="/Login" onClick={() => setIsOpen(false)}>
                                    <img src="images/user.svg" alt="User" className="w-6 h-6 invert" />
                                </Link>
                            </li>
                            <li>
                                <Link className="nav-link block hover:opacity-80 transition-opacity" to="/Wishlist" onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link className="nav-link block hover:opacity-80 transition-opacity" to="/Cart" onClick={() => setIsOpen(false)}>
                                    <img src="images/cart.svg" alt="Cart" className="w-6 h-6 invert" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
