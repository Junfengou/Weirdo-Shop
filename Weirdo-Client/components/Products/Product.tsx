import React from 'react'
import axios from "axios";

const Product: React.FC = () => {

    const client = axios.create({
        baseURL: "https://localhost:7156/" 
      });

  const fetchContent = async () => {
    client.get('api/Product').then((response) => {
        console.log(response.data);
     }).catch(err => console.log(err));
  }
    return (
        <div>
            <h1>Welcome to the product page</h1>
            <button onClick={() => fetchContent()}>Click me to fetch</button>
        </div>
    )
}

export default Product;