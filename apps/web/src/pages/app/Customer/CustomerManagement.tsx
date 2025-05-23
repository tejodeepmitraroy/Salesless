
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, User } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';

interface PurchaseHistory {
  id: number;
  productName: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Refunded';
}

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  signupDate: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  purchases: PurchaseHistory[];
}

// Sample data for demonstration
const USERS_DATA: UserData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 (555) 123-4567',
    signupDate: '2023-01-15',
    lastActive: '2023-06-22',
    status: 'Active',
    purchases: [
      { id: 101, productName: 'Premium Headphones', date: '2023-02-10', amount: 149.99, status: 'Completed' },
      { id: 102, productName: 'Wireless Keyboard', date: '2023-04-05', amount: 79.99, status: 'Completed' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '+1 (555) 987-6543',
    signupDate: '2023-02-20',
    lastActive: '2023-06-18',
    status: 'Active',
    purchases: [
      { id: 103, productName: 'Smart Watch', date: '2023-03-15', amount: 199.99, status: 'Completed' }
    ]
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    mobile: '+1 (555) 234-5678',
    signupDate: '2023-03-05',
    lastActive: '2023-05-30',
    status: 'Inactive',
    purchases: []
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    mobile: '+1 (555) 876-5432',
    signupDate: '2023-04-12',
    lastActive: '2023-06-21',
    status: 'Active',
    purchases: [
      { id: 104, productName: 'Bluetooth Speaker', date: '2023-04-20', amount: 89.99, status: 'Completed' },
      { id: 105, productName: 'Laptop Stand', date: '2023-05-15', amount: 34.99, status: 'Completed' },
      { id: 106, productName: 'USB-C Hub', date: '2023-06-10', amount: 49.99, status: 'Pending' }
    ]
  },
  {
    id: 5,
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    mobile: '+1 (555) 345-6789',
    signupDate: '2023-05-08',
    lastActive: '2023-06-01',
    status: 'Suspended',
    purchases: [
      { id: 107, productName: 'Wireless Mouse', date: '2023-05-10', amount: 29.99, status: 'Completed' },
      { id: 108, productName: 'Monitor', date: '2023-05-25', amount: 249.99, status: 'Refunded' }
    ]
  }
];

const CustomerManagement = () => {
  const [users, setUsers] = useState<UserData[]>(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setUsers(USERS_DATA);
      return;
    }

    const filtered = USERS_DATA.filter(user => 
      user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.mobile.includes(e.target.value)
    );
    setUsers(filtered);
  };

  const handleUserSelect = (user: UserData) => {
    setSelectedUser(user);
  };

  const exportUsers = () => {
    const data = users.map(user => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Mobile: user.mobile,
      'Signup Date': user.signupDate,
      'Last Active': user.lastActive,
      Status: user.status,
      'Purchase Count': user.purchases.length,
      'Total Spent': user.purchases.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(2)
    }));
    
    exportToCSV(data, 'users-data');
  };

  const exportUserPurchases = (user: UserData) => {
    const data = user.purchases.map(purchase => ({
      ID: purchase.id,
      Product: purchase.productName,
      Date: purchase.date,
      Amount: purchase.amount.toFixed(2),
      Status: purchase.status
    }));
    
    exportToCSV(data, `${user.name.replace(/\s+/g, '-').toLowerCase()}-purchases`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-7 w-7" />
          Customer Management
        </h1>
        <Button onClick={exportUsers} className="gap-2">
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="cursor-pointer" onClick={() => handleUserSelect(user)}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.signupDate}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserSelect(user);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedUser && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Profile: {selectedUser.name}</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => exportUserPurchases(selectedUser)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export Purchases
              </Button>
            </div>
            <CardDescription>
              Last active: {selectedUser.lastActive} | Status: {selectedUser.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">User Details</TabsTrigger>
                <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                    <p>{selectedUser.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Signup Date</p>
                    <p>{selectedUser.signupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                    <p>{selectedUser.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p>{selectedUser.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p>${selectedUser.purchases.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Purchases</p>
                    <p>{selectedUser.purchases.length}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="purchases" className="pt-4">
                {selectedUser.purchases.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedUser.purchases.map(purchase => (
                        <TableRow key={purchase.id}>
                          <TableCell>{purchase.id}</TableCell>
                          <TableCell>{purchase.productName}</TableCell>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                purchase.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                purchase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {purchase.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No purchase history available</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerManagement;
