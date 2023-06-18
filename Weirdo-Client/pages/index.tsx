import { NextPage } from "next";
import React from "react";
import Product from "components/Products/Product";


const HomePage: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Product />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
