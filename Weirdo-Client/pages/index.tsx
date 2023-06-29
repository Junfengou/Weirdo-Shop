import { NextPage } from "next";
import React from "react";
import { Card } from "@material-tailwind/react";


const HomePage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <Card className="mb-12 ml-12 mr-12 overflow-hidden ">
        <img
          alt="nature"
          className="h-[32rem] w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
        />
      </Card>
    </div>
  );
};

export default HomePage;
