import axios from "axios"
import { productImagePath, productItem, productList, productListForHomePage, productStatus } from "../Recoil/atoms"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { ProductType } from "../types/productsTypes";


const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL
  });


  // GET
export const useFetchProductList = () => {
    const setProductList = useSetRecoilState(productList);
    const fetchProductsFromServer = async () => {
        await client.get('api/Product').then((response) => {
            setProductList(response.data);
         }).catch(err => console.error(err));
         return false;
    }
    return fetchProductsFromServer;
}

export const useFetchProductListForHomePage = () => {
    const setProductList = useSetRecoilState(productListForHomePage);
    const fetchProductsFromServer = async () => {
        await client.get('api/Product/home').then((response) => {
            setProductList(response.data);
         }).catch(err => console.error(err));
         return false;
    }
    return fetchProductsFromServer;
}

export const useFetchProductItem = () => {
    const setProductItem = useSetRecoilState(productItem);
    const fetchProductsFromServer = async (id: string | string[] | undefined) => {
        await client.get(`api/Product/${id}`).then((response) => {
            setProductItem(response.data);
         }).catch(err => console.error(err));
         return false;
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