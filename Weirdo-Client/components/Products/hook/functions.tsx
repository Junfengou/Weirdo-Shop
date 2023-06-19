import axios from "axios"
import { productImagePath, productList, productStatus } from "../Recoil/atoms"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { ProductType } from "../types/productsTypes";


const client = axios.create({
    baseURL: "https://localhost:7156/" 
  });


  // GET
export const useFetchProductList = () => {
    const setProductList = useSetRecoilState(productList);
    const fetchProductsFromServer = async () => {
        await client.get('api/Product').then((response) => {
            setProductList(response.data);
         }).catch(err => console.log(err));
    }
    return fetchProductsFromServer;
}

// POST
export const useSendProductImageToAzureBlob = () => {
    const productImagePathRecoilState = useSetRecoilState(productImagePath);
    const SendProductImageToAzureBlob = async (file: any) => {
        const formData = new FormData();
        formData.append("imageFile", file);
        await client.post('api/File/upload', formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then(res => productImagePathRecoilState(res.data.urlPath)).catch(err => console.error(err));
    }
    return SendProductImageToAzureBlob;
}

export const useSendProductForm = () => {
    const setProductStatusRecoilState = useSetRecoilState(productStatus);
    const sendProductForm = async (formData: ProductType) => {
        await client.post('api/Product', formData, {headers: {'Content-Type': 'application/json'}})
        .then(res => setProductStatusRecoilState({status: res.status, message: "Product Created"}))
        .catch(err => setProductStatusRecoilState({status: err.status, message: "There was some complication with your request"}))
    }
    return sendProductForm;
}