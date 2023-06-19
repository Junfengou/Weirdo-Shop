import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useFetchProductList, useSendProductImageToAzureBlob } from './hook/functions';
import { productList } from "./Recoil/atoms"
import { useRecoilValue } from 'recoil';


const AddProductForm: React.FC = () => {
    const fileTypes: string[] = ["JPG", "PNG", "GIF"];

    const productListRecoilState = useRecoilValue(productList);

    const fetchProducts = useFetchProductList();
    const sendProductImageToAzureBlob = useSendProductImageToAzureBlob();

    const handleChange = (file: any) => sendProductImageToAzureBlob(file);

    // Test: Come back and delete this
    console.log(productListRecoilState)

    return (
        <div>
            <h1>Welcome to the product page</h1>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <button onClick={fetchProducts}>Click me to fetch</button>
        </div>
    )
}

export default AddProductForm;