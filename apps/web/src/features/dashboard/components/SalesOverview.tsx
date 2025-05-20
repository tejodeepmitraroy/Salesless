
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart } from 'lucide-react';
import VendorList from './VendorList';

const SalesOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Sales Overview</span>
            <Badge variant="outline" className="bg-vsphere-light/50">
              Last 30 days
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md">
            <div className="flex flex-col items-center text-gray-400">
              <BarChart className="h-12 w-12 mb-2" />
              <p>Sales chart visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <VendorList />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverview;
