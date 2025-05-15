
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample store data - would come from an API in a real app
const sampleStores = [
  { id: '1', name: 'Fashion Boutique', role: 'Owner', lastAccessed: '2023-05-10', products: 45 },
  { id: '2', name: 'Electronics Warehouse', role: 'Admin', lastAccessed: '2023-05-08', products: 128 },
  { id: '3', name: 'Home Decor', role: 'Staff', lastAccessed: '2023-05-01', products: 67 },
];

const storeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: 'spring',
      stiffness: 100
    }
  })
};

const StoreSelection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stores, setStores] = useState(sampleStores);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
  };

  const handleContinue = () => {
    if (selectedStore) {
      toast({
        title: "Store selected",
        description: `You've selected ${stores.find(store => store.id === selectedStore)?.name}`
      });
      
      // In a real app, you would save the selected store in context/state
      // and redirect to the main admin dashboard
      navigate('/admin');
    }
  };

  const handleCreateStore = () => {
    navigate('/create-store');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-vsphere-primary">Vendor</span>
            <span className="text-vsphere-dark">Sphere</span>
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {user?.name || 'User'}! Select a store to continue.
          </p>
        </div>

        <div className="grid gap-6">
          {stores.map((store, i) => (
            <motion.div
              key={store.id}
              custom={i}
              variants={storeVariants}
              initial="hidden"
              animate="visible"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${selectedStore === store.id ? 'ring-2 ring-vsphere-primary' : ''}`}
                onClick={() => handleStoreSelect(store.id)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-6">
                    <div className="h-12 w-12 bg-gradient-to-br from-vsphere-primary to-vsphere-secondary rounded-md flex items-center justify-center mr-4 text-white font-bold">
                      {store.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <p className="text-sm text-muted-foreground">{store.role} • {store.products} products</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last accessed: {store.lastAccessed}
                    </div>
                    {selectedStore === store.id && (
                      <div className="ml-4">
                        <div className="h-6 w-6 bg-vsphere-primary rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            variants={storeVariants}
            initial="hidden"
            animate="visible"
            custom={stores.length}
          >
            <Card className="cursor-pointer border-dashed hover:shadow-md transition-all" onClick={handleCreateStore}>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium">Create a new store</h3>
                  <p className="text-sm text-muted-foreground">Start with a fresh store setup</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleContinue} 
            disabled={!selectedStore}
            className="px-6"
          >
            <span>Continue</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default StoreSelection;
