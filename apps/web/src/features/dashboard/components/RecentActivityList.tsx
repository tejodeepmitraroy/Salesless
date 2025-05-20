
import React from 'react';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

const activities = [
  { action: 'New vendor registration', user: 'Coastal Crafts', time: '5 minutes ago' },
  { action: 'Product approved', user: 'Tech Universe', time: '22 minutes ago' },
  { action: 'New order placed', user: 'Customer #3845', time: '1 hour ago' },
  { action: 'Refund processed', user: 'Order #45921', time: '3 hours ago' },
  { action: 'New product added', user: 'Home Elegance', time: '5 hours ago' },
];

const RecentActivityList = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100">
          <div className="bg-vsphere-light h-8 w-8 rounded-full flex items-center justify-center text-vsphere-primary">
            {activity.action.includes('vendor') ? <Users className="h-4 w-4" /> :
             activity.action.includes('Product') ? <Package className="h-4 w-4" /> :
             activity.action.includes('order') ? <ShoppingCart className="h-4 w-4" /> :
             activity.action.includes('Refund') ? <DollarSign className="h-4 w-4" /> :
             <TrendingUp className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-sm font-medium">{activity.action}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{activity.user}</span>
              <span className="mx-1">•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;
