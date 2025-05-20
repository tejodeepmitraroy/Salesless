import { create } from "zustand";

export type Vendor = {
  id: number;
  name: string;
  category: string;
  status: 'pending' | 'active';
  email: string;
  phone?: string;
  address?: string;
  description?: string;
  appliedDate?: string;
  joinedDate?: string;
  rating?: number;
};

interface VendorState {
  pendingVendors: Vendor[];
  activeVendors: Vendor[];
  selectedVendor: Vendor | null;
  searchQuery: string;
  filterCategory: string;
}

interface VendorActions {
  // CRUD operations
  addVendor: (vendor: Vendor) => void;
  updateVendor: (vendor: Vendor) => void;
  deleteVendor: (vendorId: number) => void;
  
  // Vendor status management
  approveVendor: (vendorId: number) => void;
  rejectVendor: (vendorId: number) => void;
  updateVendorRating: (vendorId: number, rating: number) => void;
  
  // UI state management
  setSelectedVendor: (vendor: Vendor | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  
  // Filtered results
  getFilteredPendingVendors: () => Vendor[];
  getFilteredActiveVendors: () => Vendor[];
}

type VendorStore = VendorState & VendorActions;

const initialState: VendorState = {
  pendingVendors: [
     {
      id: 1,
      name: 'Craft Delights',
      category: 'Artisan Crafts',
      status: 'pending',
      appliedDate: '2024-02-15',
      email: 'info@craftdelights.com',
      phone: '(555) 123-4567',
      address: '123 Craft St, Artisan City, CA 94582',
      description: 'Handmade artisan crafts from local artists. Specializing in pottery, jewelry, and home decor.'
    },
    {
      id: 2,
      name: 'Tech Innovations',
      category: 'Electronics',
      status: 'pending',
      appliedDate: '2024-02-14',
      email: 'contact@techinnovations.com',
      phone: '(555) 987-6543',
      description: 'Cutting-edge electronics and tech accessories.'
    },
    {
      id: 3,
      name: 'Green Living',
      category: 'Home & Garden',
      status: 'pending',
      appliedDate: '2024-02-13',
      email: 'hello@greenliving.com',
      phone: '(555) 234-5678',
      description: 'Eco-friendly home and garden products.'
    },
   
  ],
  activeVendors: [
    {
      id: 4,
      name: 'Artisan Crafts',
      category: 'Home Decor',
      status: 'active',
      joinedDate: '2024-01-15',
      rating: 4.8,
      email: 'sales@artisancrafts.com',
      phone: '(555) 456-7890',
      address: '456 Decor Blvd, Design District, NY 10001',
      description: 'Premium home decor items handcrafted by skilled artisans from around the world.'
    },
    {
      id: 5,
      name: 'Tech Universe',
      category: 'Electronics',
      status: 'active',
      joinedDate: '2024-01-10',
      rating: 4.5,
      email: 'support@techuniverse.com',
      phone: '(555) 567-8901',
      description: 'Latest tech gadgets and electronics accessories.'
    },
    {
      id: 6,
      name: 'Fashion Forward',
      category: 'Fashion',
      status: 'active',
      joinedDate: '2024-01-01',
      rating: 4.9,
      email: 'hello@fashionforward.com',
      phone: '(555) 678-9012',
      address: '789 Style Ave, Fashion District, CA 90015',
      description: 'Trendy clothing and accessories for the fashion-conscious consumer.'
    },
  ]
  ,
  selectedVendor: null,
  searchQuery: '',
  filterCategory: 'all',
};

export const useVendorStore = create<VendorStore>((set, get) => ({
  ...initialState,

  addVendor: (vendor: Vendor) =>
    set((state) => ({
      pendingVendors: [...state.pendingVendors, { ...vendor, status: 'pending' }],
    })),

  updateVendor: (vendor: Vendor) =>
    set((state) => ({
      pendingVendors: state.pendingVendors.map((v) => 
        v.id === vendor.id ? vendor : v
      ),
      activeVendors: state.activeVendors.map((v) => 
        v.id === vendor.id ? vendor : v
      ),
    })),

  deleteVendor: (vendorId: number) =>
    set((state) => ({
      pendingVendors: state.pendingVendors.filter((v) => v.id !== vendorId),
      activeVendors: state.activeVendors.filter((v) => v.id !== vendorId),
    })),

  approveVendor: (vendorId: number) =>
    set((state) => {
      const vendor = state.pendingVendors.find((v) => v.id === vendorId);
      if (!vendor) return state;

      const approvedVendor = {
        ...vendor,
        status: 'active' as const,
        joinedDate: new Date().toISOString().split('T')[0],
        rating: 0,
      };

      return {
        pendingVendors: state.pendingVendors.filter((v) => v.id !== vendorId),
        activeVendors: [...state.activeVendors, approvedVendor],
      };
    }),

  rejectVendor: (vendorId: number) =>
    set((state) => ({
      pendingVendors: state.pendingVendors.filter((v) => v.id !== vendorId),
    })),

  updateVendorRating: (vendorId: number, rating: number) =>
    set((state) => ({
      activeVendors: state.activeVendors.map((v) =>
        v.id === vendorId ? { ...v, rating } : v
      ),
    })),

  setSelectedVendor: (vendor: Vendor | null) =>
    set(() => ({
      selectedVendor: vendor,
    })),

  setSearchQuery: (query: string) =>
    set(() => ({
      searchQuery: query,
    })),

  setFilterCategory: (category: string) =>
    set(() => ({
      filterCategory: category,
    })),

  getFilteredPendingVendors: () => {
    const state = get();
    let filtered = state.pendingVendors;

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query)
      );
    }

    if (state.filterCategory !== 'all') {
      filtered = filtered.filter(
        (vendor) => vendor.category === state.filterCategory
      );
    }

    return filtered;
  },

  getFilteredActiveVendors: () => {
    const state = get();
    let filtered = state.activeVendors;

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query)
      );
    }

    if (state.filterCategory !== 'all') {
      filtered = filtered.filter(
        (vendor) => vendor.category === state.filterCategory
      );
    }

    return filtered;
  },
})); 