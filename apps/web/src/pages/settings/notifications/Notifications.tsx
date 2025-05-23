
import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  MailOpen, 
  Tag,
  ShoppingCart, 
  AlertCircle, 
  Settings,
  RefreshCw,
  Trash
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
// import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

// Define notification types
type NotificationType = 'order' | 'system' | 'alert';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: NotificationType;
}

const Notifications = () => {
  // const { toast } = useToast();
  
  // Sample notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #12345 has been placed for $129.99',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Premium Headphones has reached the low stock threshold',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false,
      type: 'alert'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'The platform will be down for maintenance on Sunday at 2 AM EST',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
      type: 'system'
    },
    {
      id: '4',
      title: 'New Product Approval Required',
      message: 'Vendor "AudioTech" has submitted a new product for approval',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: true,
      type: 'system'
    },
    {
      id: '5',
      title: 'Customer Refund Request',
      message: 'A refund has been requested for Order #11982',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      type: 'order'
    },
    {
      id: '6',
      title: 'Security Alert',
      message: 'Unusual login activity detected from new location',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      read: true,
      type: 'alert'
    }
  ]);

  // Filter by notification type
  const orderNotifications = notifications.filter(n => n.type === 'order');
  const systemNotifications = notifications.filter(n => n.type === 'system');
  const alertNotifications = notifications.filter(n => n.type === 'alert');
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast("All notifications marked as read",{
    
      description: `${unreadCount} notification${unreadCount !== 1 ? 's' : ''} marked as read.`
    });
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  // Render icon based on notification type
  const renderNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your notifications and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <MailOpen className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="orders">
            Orders
            {orderNotifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                {orderNotifications.filter(n => !n.read).length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <TabsContent value="all" className="m-0">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      formatTimestamp={formatTimestamp}
                      renderIcon={renderNotificationIcon}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <Bell className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>You have no notifications</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="orders" className="m-0">
              {orderNotifications.length > 0 ? (
                <div className="divide-y">
                  {orderNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      formatTimestamp={formatTimestamp}
                      renderIcon={renderNotificationIcon}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>No order notifications</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="system" className="m-0">
              {systemNotifications.length > 0 ? (
                <div className="divide-y">
                  {systemNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      formatTimestamp={formatTimestamp}
                      renderIcon={renderNotificationIcon}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <Settings className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>No system notifications</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="alerts" className="m-0">
              {alertNotifications.length > 0 ? (
                <div className="divide-y">
                  {alertNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      formatTimestamp={formatTimestamp}
                      renderIcon={renderNotificationIcon}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>No alert notifications</p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>Product Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vsphere-primary"></div>
                </label>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Order Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vsphere-primary"></div>
                </label>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>System Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vsphere-primary"></div>
                </label>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Security Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vsphere-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  formatTimestamp: (date: Date) => string;
  renderIcon: (type: NotificationType) => React.ReactNode;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  formatTimestamp,
  renderIcon,
  onMarkAsRead,
  onDelete
}) => {
  return (
    <div className={`p-4 hover:bg-muted/50 ${!notification.read ? 'bg-primary/5' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {renderIcon(notification.type)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {notification.message}
          </p>
        </div>
        <div className="flex gap-1">
          {!notification.read && (
            <Button variant="ghost" size="icon" onClick={() => onMarkAsRead(notification.id)} title="Mark as read">
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => onDelete(notification.id)} title="Delete">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
