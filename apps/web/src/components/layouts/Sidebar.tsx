
import React from 'react';
import { useLocation } from 'react-router';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, 
  Settings, LogOut, BarChart, Megaphone, 
  FileText, UserCircle, LayoutTemplate, User, Bell, LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarItem from './SidebarItem';
import { motion } from 'framer-motion';

interface SidebarProps {
  sidebarOpen: boolean;
}

const sidebarVariants = {
  open: { width: '16rem', x: 0 }, 
  closed: { width: '4rem', x: 0 }
};

const listVariants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const location = useLocation();

  return (
    <motion.aside 
      variants={sidebarVariants}
      animate={sidebarOpen ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "bg-background border-r border-border fixed h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] z-10 overflow-y-auto scrollbar-thin",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-3 md:p-4">
        <motion.nav 
          className="space-y-1"
          variants={listVariants}
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
        >
          <SidebarItem 
            icon={LayoutGrid} 
            label="App Launcher" 
            href="/" 
            active={location.pathname === '/'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={location.pathname === '/dashboard'} 
            href="/dashboard" 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Package} 
            label="Products" 
            href="/products" 
            active={location.pathname === '/products'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Users} 
            label="Vendors" 
            href="/vendors" 
            active={location.pathname === '/vendors'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={ShoppingCart} 
            label="Orders" 
            href="/orders" 
            active={location.pathname === '/orders'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Package} 
            label="Inventory" 
            href="/inventory" 
            active={location.pathname === '/inventory'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={UserCircle} 
            label="Employees" 
            href="/employees" 
            active={location.pathname === '/employees'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={User} 
            label="Users" 
            href="/users" 
            active={location.pathname === '/users'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={BarChart} 
            label="Analytics" 
            href="/analytics" 
            active={location.pathname === '/analytics'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Megaphone} 
            label="Marketing" 
            href="/marketing" 
            active={location.pathname === '/marketing'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={FileText} 
            label="Blog" 
            href="/blog" 
            active={location.pathname === '/blog'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={LayoutTemplate} 
            label="CMS" 
            href="/cms" 
            active={location.pathname === '/cms'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Bell} 
            label="Notifications" 
            href="/notifications" 
            active={location.pathname === '/notifications'} 
            collapsed={!sidebarOpen} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={location.pathname === '/settings'} 
            collapsed={!sidebarOpen} 
          />
        </motion.nav>

        <Separator className="my-3 md:my-4" />
        
        <SidebarItem icon={LogOut} label="Logout" href="/" collapsed={!sidebarOpen} />
      </div>
    </motion.aside>
  );
};

export default Sidebar;
