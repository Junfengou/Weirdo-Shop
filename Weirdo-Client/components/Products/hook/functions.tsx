import axios from "axios"
import { productImagePath, productList } from "../Recoil/atoms"
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

// export const useFetchProductImage = () => {
//     const productImagePathRecoilState = useRecoilValue(productImagePath);
//     const fetchProductImageFromAzureBlob = async (productImagePathRecoilState: string) => {
//         await axios.get(productImagePathRecoilState)
//         .then((res) => console.log(res))
//         .catch(err => console.error(err))
//     }
//     return fetchProductImageFromAzureBlob;
// }

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
    const sendProductForm = async (formData: ProductType) => {
        await client.post('api/Product', formData, {headers: {'Content-Type': 'application/json'}})
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    return sendProductForm;
}