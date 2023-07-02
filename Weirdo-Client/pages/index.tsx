import Home from "components/Home/Home";
import { NextPage } from "next";
import React from "react";


const HomePage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <Home />
    </div>
  );
};

export default HomePage;
