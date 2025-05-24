
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const HeroImage = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-xl">
      <div className="aspect-video bg-gradient-to-br from-[#FF6600]/10 to-[#00B86B]/10 p-4 rounded-lg">
        {/* Dashboard UI Mockup */}
        <div className="w-full h-full bg-white rounded-md shadow-lg overflow-hidden">
          <div className="bg-[#FF6600] h-12 px-4 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-white text-xs ml-4">SalesSync Dashboard</div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
              <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
              <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <div className="bg-[#FF6600]/10 p-4 rounded-lg mb-4">
                  <div className="h-4 bg-[#FF6600]/20 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#FF6600]/20 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-100 h-40 rounded animate-pulse"></div>
              </div>
              <div className="w-2/3">
                <div className="bg-[#00B86B]/10 p-4 rounded-lg mb-4">
                  <div className="h-4 bg-[#00B86B]/20 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#00B86B]/20 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 h-24 rounded animate-pulse"></div>
                  <div className="bg-gray-100 h-24 rounded animate-pulse"></div>
                  <div className="bg-gray-100 h-24 rounded animate-pulse"></div>
                  <div className="bg-gray-100 h-24 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation overlay elements */}
      <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#FF6600] rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#00B86B] rounded-full opacity-10 animate-pulse"></div>
    </div>
  );
};

export default HeroImage;
