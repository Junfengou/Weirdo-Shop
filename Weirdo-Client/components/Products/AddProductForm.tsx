import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link";
import { FileUploader } from "react-drag-drop-files";
import { useSendProductForm, useSendProductImageToAzureBlob } from './hook/functions';
import { productImagePath, productImageName, productStatus } from "./Recoil/atoms"
import { useRecoilValue, useRecoilState } from 'recoil';
import { ProductType } from './types/productsTypes';


const AddProductForm: React.FC = () => {
    const fileTypes: string[] = ["JPG", "PNG", "GIF"];

    const [formData, setFormData] = useState<ProductType | undefined>();

    const productStatusRecoilState = useRecoilValue(productStatus);

    const [productImageNameRecoilState, SetProductImageNameRecoilState] = useRecoilState(productImageName)
    const [productImagePathRecoilState, setProductImagePathRecoilState] = useRecoilState(productImagePath);

    const sendProductImageToAzureBlob = useSendProductImageToAzureBlob();
    const sendProductFormData = useSendProductForm();

    const handleChange = (file: any) => sendProductImageToAzureBlob(file);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const data = {
        name: e.target.elements.productName.value,
        description: e.target.elements.productDesc.value,
        price: e.target.elements.productPrice.value,
        imagePath: productImagePathRecoilState
      }

      if(data != undefined) {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          imagePath: productImagePathRecoilState
        })
        await sendProductFormData(data);
      }
        
    }

    useEffect(() => {
      SetProductImageNameRecoilState("")
      setProductImagePathRecoilState("")
    }, [])

    return (
        <div className='w-80 min-w-min'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input onChange={(e) => SetProductImageNameRecoilState(e.target.value)} name="productName" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input name="productDesc" type="text" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input name="productPrice" type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              {productImagePathRecoilState != "" && (
                <div className=' bg-white-200 border-2 rounded-lg mb-10'>
                  <Image src={productImagePathRecoilState} width={150} height={150} loading='lazy' alt="product-image" 
                  className="object-contain h-48 w-96" />
                </div>
              )}
              {productImageNameRecoilState != "" &&
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              }
              <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            {formData != undefined && productStatusRecoilState.status != null && (
              <>
              <h1>{productStatusRecoilState.message}</h1>
                {productStatusRecoilState.status == 200 ?
                  <Link href="/" className='active:bg-blue-600'>View Item in the shopping page</Link>
                : <h2>Try again later?</h2>
                }
              </>
            )}
        </div>
    )
}

export default AddProductForm;