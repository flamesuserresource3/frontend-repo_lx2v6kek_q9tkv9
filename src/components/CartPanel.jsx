import React, { useMemo, useState } from 'react';
import { X, Minus, Plus, Trash2, CheckCircle, Mail } from 'lucide-react';

const CartItem = ({ item, onInc, onDec, onRemove }) => {
  return (
    <div className="flex gap-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover border border-gray-200" />
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <button onClick={() => onDec(item.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-sm">{item.qty}</span>
            <button onClick={() => onInc(item.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
              <Plus size={16} />
            </button>
          </div>
          <div className="text-right font-medium text-gray-900">
            ${(item.price * item.qty).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ onConfirm, loading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const canSubmit = email && address;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onConfirm({ email, name, address });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email for receipt</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipping address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, Country"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Pay now (mock)'}
      </button>
      <p className="text-xs text-gray-500 text-center">Guest checkout — no account required</p>
    </form>
  );
};

const Confirmation = ({ orderId, onClose }) => {
  return (
    <div className="text-center py-6">
      <CheckCircle className="mx-auto text-emerald-600" size={40} />
      <h3 className="mt-3 text-xl font-semibold text-gray-900">Order confirmed</h3>
      <p className="text-gray-600 mt-1">Your order #{orderId} is on its way. A receipt has been sent to your email.</p>
      <button onClick={onClose} className="mt-6 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50">Continue shopping</button>
    </div>
  );
};

const CartPanel = ({ open, items, onClose, onInc, onDec, onRemove, clearCart }) => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const fees = subtotal > 0 ? 7 : 0;
  const total = subtotal + fees;

  const handleConfirm = async (payload) => {
    setLoading(true);
    // Simulate payment processing delay
    setTimeout(() => {
      const id = Math.random().toString(36).slice(2, 10).toUpperCase();
      setOrderId(id);
      clearCart();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-gray-200 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Your cart</h3>
          <button onClick={onClose} className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>

        <div className="h-[calc(100%-4rem)] grid grid-rows-[1fr_auto]">
          <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 && !orderId && (
              <p className="text-gray-600">Your cart is empty. Add a product to get started.</p>
            )}

            {orderId && <Confirmation orderId={orderId} onClose={onClose} />}

            {!orderId && items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onInc={onInc}
                onDec={onDec}
                onRemove={onRemove}
              />
            ))}
          </div>

          {!orderId && (
            <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Shipping & fees</span><span className="font-medium">${fees.toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <CheckoutForm onConfirm={handleConfirm} loading={loading} />
              <p className="text-xs text-gray-500 text-center">Secure checkout powered by industry standards. Social sign-in coming soon.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartPanel;
