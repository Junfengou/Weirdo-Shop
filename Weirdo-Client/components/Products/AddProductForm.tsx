import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useFetchProductList, useSendProductForm, useSendProductImageToAzureBlob } from './hook/functions';
import { productList, productForm } from "./Recoil/atoms"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ProductType } from './types/productsTypes';


const AddProductForm: React.FC = () => {
    const fileTypes: string[] = ["JPG", "PNG", "GIF"];

    const productListRecoilState = useRecoilValue(productList);
    const setProductForm = useSetRecoilState(productForm);

    const fetchProducts = useFetchProductList();
    const sendProductImageToAzureBlob = useSendProductImageToAzureBlob();
    const sendProductFormData = useSendProductForm();

    const handleChange = (file: any) => sendProductImageToAzureBlob(file);

    // Test: Come back and delete this
    console.log(productListRecoilState)

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const formData: ProductType = {
        name: e.target.elements.productName.value,
        description: e.target.elements.productDesc.value,
        price: e.target.elements.productPrice.value
      }
      await sendProductFormData(formData);
    }
    return (
        <div>
            {/* <h1>Welcome to the product page</h1> */}
            
            {/* <button onClick={fetchProducts}>Click me to fetch</button> */}

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input name="productName" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input name="productDesc" type="text" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input name="productPrice" type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default AddProductForm;