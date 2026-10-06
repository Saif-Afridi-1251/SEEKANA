import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pb-12 mb-12 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] font-mono block mb-2">
            SEEKANA Departments
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Curated Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-3 leading-relaxed">
            Explore our collections structured around natural materials, functional design, and understated elegance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', undefined, cat.slug)}
              className="group cursor-pointer border border-[#E8E8E8] bg-[#F7F7F5] flex flex-col overflow-hidden transition-all duration-300 hover:border-[#111111]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-200 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>

              <div className="p-6 bg-white flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#777777] font-mono mb-1">
                    <span>SEEKANA</span>
                    <span>{cat.itemCount} Products</span>
                  </div>
                  <h2 className="font-heading text-lg font-bold text-[#111111] group-hover:text-black">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:translate-x-1 transition-transform">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
