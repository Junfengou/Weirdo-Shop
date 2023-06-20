import ProductList from "components/Products/ProductList";
import { NextPage } from "next";
import React from 'react'

const ProductsPage: NextPage = () => {
    return (
      <div className="container">
        <div className="grid min-h-screen">
          <div className="flex flex-col">
            <ProductList />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductsPage;