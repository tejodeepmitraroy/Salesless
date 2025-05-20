
import React from 'react';
import MetricCard from './MetricCard';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Revenue" 
        value="$24,345" 
        change="+12.5%" 
        trend="up" 
        icon={DollarSign} 
        color="bg-vsphere-primary/10"
        iconColor="text-vsphere-primary"
      />
      <MetricCard 
        title="Orders" 
        value="342" 
        change="+8.2%" 
        trend="up" 
        icon={ShoppingCart} 
        color="bg-vsphere-secondary/10"
        iconColor="text-vsphere-secondary"
      />
      <MetricCard 
        title="Vendors" 
        value="45" 
        change="+3.1%" 
        trend="up" 
        icon={Users} 
        color="bg-vsphere-mint/20"
        iconColor="text-vsphere-dark"
      />
      <MetricCard 
        title="Products" 
        value="1,298" 
        change="-2.5%" 
        trend="down" 
        icon={Package} 
        color="bg-vsphere-accent/10"
        iconColor="text-vsphere-dark"
      />
    </div>
  );
};

export default DashboardMetrics;
