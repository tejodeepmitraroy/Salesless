
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, 
  Settings, BarChart, Megaphone, 
  FileText, UserCircle, LayoutTemplate, User, Bell
} from 'lucide-react';

interface AppTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  color: string;
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const tileVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const AppTile: React.FC<AppTileProps> = ({ icon, title, description, to, color, index }) => {
  return (
    <motion.div
      variants={tileVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link to={to} className="block h-full">
        <Card className="h-full border-2 hover:border-vsphere-primary transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6 flex flex-col h-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
              className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${color}`}
            >
              {icon}
            </motion.div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const AppLauncher: React.FC = () => {
  const apps = [
    {
      icon: <LayoutDashboard className="text-white h-6 w-6" />,
      title: "Dashboard",
      description: "Overview of key metrics and performance",
      to: "/admin",
      color: "bg-blue-500"
    },
    {
      icon: <Package className="text-white h-6 w-6" />,
      title: "Products",
      description: "Manage your product catalog",
      to: "/admin/products",
      color: "bg-green-500"
    },
    {
      icon: <ShoppingCart className="text-white h-6 w-6" />,
      title: "Orders",
      description: "Track and manage customer orders",
      to: "/admin/orders",
      color: "bg-orange-500"
    },
    {
      icon: <Package className="text-white h-6 w-6" />,
      title: "Inventory",
      description: "Track and manage stock levels",
      to: "/admin/inventory",
      color: "bg-cyan-500"
    },
    {
      icon: <Users className="text-white h-6 w-6" />,
      title: "Vendors",
      description: "Manage vendor relationships and accounts",
      to: "/admin/vendors",
      color: "bg-purple-500"
    },
    {
      icon: <UserCircle className="text-white h-6 w-6" />,
      title: "Employees",
      description: "Manage staff and permissions",
      to: "/admin/employees",
      color: "bg-indigo-500"
    },
    {
      icon: <User className="text-white h-6 w-6" />,
      title: "Users",
      description: "Manage customer accounts",
      to: "/admin/users",
      color: "bg-pink-500"
    },
    {
      icon: <BarChart className="text-white h-6 w-6" />,
      title: "Analytics",
      description: "Insights and performance metrics",
      to: "/admin/analytics",
      color: "bg-yellow-500"
    },
    {
      icon: <Megaphone className="text-white h-6 w-6" />,
      title: "Marketing",
      description: "Campaigns and promotions",
      to: "/admin/marketing",
      color: "bg-red-500"
    },
    {
      icon: <FileText className="text-white h-6 w-6" />,
      title: "Blog",
      description: "Manage blog content and posts",
      to: "/admin/blog",
      color: "bg-emerald-500"
    },
    {
      icon: <LayoutTemplate className="text-white h-6 w-6" />,
      title: "CMS",
      description: "Manage website content",
      to: "/admin/cms",
      color: "bg-violet-500"
    },
    {
      icon: <Bell className="text-white h-6 w-6" />,
      title: "Notifications",
      description: "Manage system alerts and messages",
      to: "/admin/notifications",
      color: "bg-amber-500"
    },
    {
      icon: <Settings className="text-white h-6 w-6" />,
      title: "Settings",
      description: "Configure system preferences",
      to: "/admin/settings",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="container py-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">App Launcher</h1>
        <p className="text-muted-foreground">Access all VendorSphere admin applications in one place</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {apps.map((app, index) => (
          <AppTile 
            key={index}
            icon={app.icon}
            title={app.title}
            description={app.description}
            to={app.to}
            color={app.color}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AppLauncher;
