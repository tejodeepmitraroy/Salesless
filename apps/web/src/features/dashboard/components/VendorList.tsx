
import React from 'react';

// Helper function to get vendor background colors
const getVendorColor = (index: number): string => {
  const colors = [
    'bg-vsphere-primary/10 text-vsphere-primary',
    'bg-vsphere-secondary/10 text-vsphere-secondary',
    'bg-vsphere-accent/10 text-vsphere-dark',
    'bg-vsphere-mint/10 text-vsphere-dark',
    'bg-vsphere-skyblue/10 text-vsphere-dark',
  ];
  return colors[index % colors.length];
};

const VendorList = () => {
  return (
    <div className="space-y-4">
      {['Artisan Crafts', 'Tech Universe', 'Fashion Forward', 'Home Elegance', 'Beauty Essentials'].map((vendor, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getVendorColor(i)}`}>
              {vendor.charAt(0)}
            </div>
            <span className="text-sm font-medium">{vendor}</span>
          </div>
          <span className="text-sm text-gray-600">${(5000 - i * 800).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default VendorList;
