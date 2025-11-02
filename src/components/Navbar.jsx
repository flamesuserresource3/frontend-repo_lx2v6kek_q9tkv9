import React from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = ({ onCartOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-black text-white">
            <span className="font-bold tracking-tight">MVP</span>
          </div>
          <span className="font-semibold text-gray-900">Minimal Shop</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#products" className="hover:text-gray-900 transition-colors">Products</a>
          <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="#support" className="hover:text-gray-900 transition-colors">Support</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <User size={18} />
            <span className="text-sm">Sign in</span>
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-black"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline text-sm">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
