import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
            <div className="flex items-center justify-end text-xs text-amber-600">
              <Star size={14} className="fill-amber-500 stroke-amber-500" />
              <span className="ml-1">{product.rating}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-4 w-full px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, onAdd }) => {
  return (
    <section id="products" className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured products</h2>
            <p className="text-gray-600 mt-1">Curated essentials that shine in 3D.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
