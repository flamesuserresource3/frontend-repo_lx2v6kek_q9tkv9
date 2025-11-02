import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';

const initialProducts = [
  {
    id: 'p1',
    name: 'Aero Lamp',
    subtitle: 'Aluminum • Matte Black',
    price: 129,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1614447912052-0db13d71b82e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBZXJvJTIwTGFtcHxlbnwwfDB8fHwxNzYyMDc4NzAyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Calm Headphones',
    subtitle: 'Noise-cancelling • Wireless',
    price: 199,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1495175448924-1d9a30c90a42?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDYWxtJTIwSGVhZHBob25lc3xlbnwwfDB8fHwxNzYyMDc4NzA0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Form Chair',
    subtitle: 'Ergonomic • Oak & Steel',
    price: 249,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1605468494251-adacb7265612?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGb3JtJTIwQ2hhaXJ8ZW58MHwwfHx8MTc2MjA3ODcwOHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
];

export default function App() {
  const [products] = useState(initialProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const incQty = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decQty = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <Hero3D />

      <ProductGrid products={products} onAdd={addToCart} />

      <section id="about" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 p-6 md:p-10 bg-white grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold">Why this MVP?</h3>
              <p className="text-gray-600 mt-2">Fast, focused, and ready to scale. We trimmed the interface to essentials, added delightful 3D where it matters, and kept checkout friction low.</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li className="p-3 rounded-lg bg-gray-50 border border-gray-200">Guest checkout</li>
              <li className="p-3 rounded-lg bg-gray-50 border border-gray-200">3D product view</li>
              <li className="p-3 rounded-lg bg-gray-50 border border-gray-200">Responsive design</li>
              <li className="p-3 rounded-lg bg-gray-50 border border-gray-200">Clean branding</li>
            </ul>
          </div>
        </div>
      </section>

      <footer id="support" className="py-12 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Minimal Shop — All rights reserved.</p>
          <div className="text-sm text-gray-600">
            Need help? Email support@example.com
          </div>
        </div>
      </footer>

      <CartPanel
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
        clearCart={clearCart}
      />

      {/* Floating cart count indicator */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 px-4 py-3 rounded-full shadow-lg bg-gray-900 text-white"
          aria-label={`Open cart with ${cartCount} items`}
        >
          Cart • {cartCount}
        </button>
      )}
    </div>
  );
}
