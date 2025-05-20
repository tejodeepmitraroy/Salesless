
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Detailed analytics content would appear here, including conversion rates,
          traffic sources, and user behavior metrics.
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
