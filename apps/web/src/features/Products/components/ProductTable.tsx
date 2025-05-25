import React from 'react'
import { productColumns } from '../tables/columns';
import { DataTable } from '../tables/data-table';

const ProductTable = () => {
    // const filtered = filteredProducts(tabValue);
  return <DataTable columns={productColumns} data={data} />;
}

export default ProductTable

