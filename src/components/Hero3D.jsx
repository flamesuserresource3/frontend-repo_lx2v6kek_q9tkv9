import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 py-12 md:py-20 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-gray-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            In stock — ships today
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Minimalist Products, Elevated with 3D
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore a focused selection of essentials designed to look great and perform even better. Rotate and inspect our featured product in 3D — smooth on any device.
          </p>
          <div className="flex items-center gap-3">
            <a href="#products" className="px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-black">Shop the collection</a>
            <a href="#support" className="px-5 py-3 rounded-md border border-gray-200 text-gray-800 hover:bg-gray-50">Get support</a>
          </div>
        </div>
        <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">
          <Spline
            scene="https://prod.spline.design/6x3nqG0kCwH6-4s3/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30" />
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
