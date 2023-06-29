import ProductList from "components/Products/ProductList";
import { NextPage } from "next";
import React from 'react'

const ProductsPage: NextPage = () => {
    return (
      <div className="mx-auto max-w-screen-lg py-12">
        <ProductList /> 
      </div>
    );
  };
  
  export default ProductsPage;