
import React from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

// import { ThemeModeToggle } from '@/components/ThemeModeToggle';
import { motion } from 'framer-motion';
import UserProfileDropdown from '../UserProfileDropdown';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-vsphere-dark text-foreground shadow-sm py-2 px-4 md:py-3 md:px-6 flex items-center justify-between sticky top-0 z-20"
    >
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2 md:mr-4"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <a href="/admin" className="flex items-center">
          <span className="text-lg md:text-xl font-bold text-primary">Salesless<span className="text-vsphere-dark">Sphere</span></span>
        </a>
      </div>
      <div className="flex items-center gap-2">
        {/* <ThemeModeToggle /> */}
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </Link>
        <UserProfileDropdown />
      </div>
    </motion.header>
  );
};

export default Header;
