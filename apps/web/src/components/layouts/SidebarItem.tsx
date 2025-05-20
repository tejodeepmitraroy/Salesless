
import React from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const iconVariants = {
  open: { rotate: 0 },
  closed: { rotate: 0 }
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false,
  collapsed = false 
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={href} 
        className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
          active 
            ? "bg-vsphere-primary/10 text-vsphere-primary" 
            : "text-gray-700 hover:bg-gray-100 hover:text-vsphere-primary"
        )}
      >
        <motion.div
          variants={iconVariants}
          animate={collapsed ? "closed" : "open"}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
        </motion.div>
        
        {!collapsed && (
          <motion.span 
            className="ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
        
        {active && !collapsed && (
          <motion.div 
            className="ml-auto"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
};

export default SidebarItem;
