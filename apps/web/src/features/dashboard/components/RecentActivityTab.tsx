
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecentActivityList from './RecentActivityList';

const RecentActivityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <RecentActivityList />
      </CardContent>
    </Card>
  );
};

export default RecentActivityTab;
