
// Inventory management data types
export type InventoryItem = {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  category: string;
  inStock: number;
  reorderPoint: number;
  onOrder: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
  vendorName: string;
  location: string;
  costPrice: number;
  retailPrice: number;
};

export type StockMovement = {
  id: number;
  productId: number;
  productName: string;
  date: string;
  type: 'Received' | 'Sold' | 'Returned' | 'Adjusted' | 'Transferred';
  quantity: number;
  reference: string;
  notes?: string;
  updatedBy: string;
};

// Sample data
export const initialInventory: InventoryItem[] = [
  {
    id: 1,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    sku: "WEP-101",
    category: "Electronics",
    inStock: 45,
    reorderPoint: 15,
    onOrder: 0,
    lastUpdated: "2024-06-08",
    status: "In Stock",
    vendorName: "TechGadgets Inc.",
    location: "Warehouse A",
    costPrice: 28.50,
    retailPrice: 59.99
  },
  {
    id: 2,
    productId: 102,
    productName: "Fitness Smart Watch",
    sku: "FSW-102",
    category: "Electronics",
    inStock: 12,
    reorderPoint: 10,
    onOrder: 25,
    lastUpdated: "2024-06-09",
    status: "Low Stock",
    vendorName: "TechGadgets Inc.",
    location: "Warehouse A",
    costPrice: 35.75,
    retailPrice: 79.99
  },
  {
    id: 3,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    sku: "BSM-103",
    category: "Electronics",
    inStock: 0,
    reorderPoint: 8,
    onOrder: 20,
    lastUpdated: "2024-06-07",
    status: "Out of Stock",
    vendorName: "AudioTech Solutions",
    location: "Warehouse B",
    costPrice: 18.25,
    retailPrice: 39.99
  },
  {
    id: 4,
    productId: 104,
    productName: "Organic Cotton T-Shirt",
    sku: "OCT-104",
    category: "Clothing",
    inStock: 87,
    reorderPoint: 25,
    onOrder: 0,
    lastUpdated: "2024-06-10",
    status: "Overstocked",
    vendorName: "EcoFashion Co.",
    location: "Warehouse C",
    costPrice: 12.50,
    retailPrice: 24.99
  },
  {
    id: 5,
    productId: 105,
    productName: "Premium Coffee Beans",
    sku: "PCB-105",
    category: "Food",
    inStock: 23,
    reorderPoint: 15,
    onOrder: 0,
    lastUpdated: "2024-06-09",
    status: "In Stock",
    vendorName: "Global Coffee Imports",
    location: "Warehouse D",
    costPrice: 8.75,
    retailPrice: 16.99
  }
];

export const initialStockMovements: StockMovement[] = [
  {
    id: 1,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    date: "2024-06-08 14:30",
    type: "Received",
    quantity: 50,
    reference: "PO-2024-112",
    notes: "Regular inventory restock",
    updatedBy: "Sarah Johnson"
  },
  {
    id: 2,
    productId: 101,
    productName: "Wireless Earbuds Pro",
    date: "2024-06-08 16:45",
    type: "Sold",
    quantity: 5,
    reference: "ORD-8842",
    updatedBy: "System"
  },
  {
    id: 3,
    productId: 102,
    productName: "Fitness Smart Watch",
    date: "2024-06-09 09:15",
    type: "Sold",
    quantity: 3,
    reference: "ORD-8846",
    updatedBy: "System"
  },
  {
    id: 4,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    date: "2024-06-07 11:20",
    type: "Sold",
    quantity: 5,
    reference: "ORD-8831",
    updatedBy: "System"
  },
  {
    id: 5,
    productId: 103,
    productName: "Bluetooth Speaker Mini",
    date: "2024-06-07 14:30",
    type: "Adjusted",
    quantity: -2,
    reference: "ADJ-667",
    notes: "Damaged inventory write-off",
    updatedBy: "Michael Chen"
  }
];
