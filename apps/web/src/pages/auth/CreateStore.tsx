
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeType, setStoreType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeName.trim()) {
      toast({
        title: "Store name required",
        description: "Please enter a name for your store",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Store created",
      description: `${storeName} has been created successfully!`,
    });
    
    setIsLoading(false);
    navigate('/admin');
  };
  
  const handleCancel = () => {
    navigate('/store-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-vsphere-primary">Vendor</span>
            <span className="text-vsphere-dark">Sphere</span>
          </h1>
          <p className="text-lg text-gray-600">Create your new store</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 bg-vsphere-primary/10 rounded-full flex items-center justify-center mr-3">
                <Store className="h-5 w-5 text-vsphere-primary" />
              </div>
              <div>
                <CardTitle>Store Details</CardTitle>
                <CardDescription>Set up your store information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name *</Label>
                <Input 
                  id="store-name" 
                  placeholder="My Awesome Store"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea 
                  id="store-description" 
                  placeholder="Describe your store in a few words..."
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-type">Store Type</Label>
                <Input
                  id="store-type" 
                  placeholder="Fashion, Electronics, etc."
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-vsphere-primary hover:bg-vsphere-primary/90"
              >
                {isLoading ? 'Creating...' : 'Create Store'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateStore;
