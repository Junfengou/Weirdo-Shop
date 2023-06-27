import ProductList from "components/Products/ProductList";
import { NextPage } from "next";
import React from 'react'

const ProductsPage: NextPage = () => {
    return (
      <div>
        <ProductList /> 
      </div>
    );
  };
  
  export default ProductsPage;