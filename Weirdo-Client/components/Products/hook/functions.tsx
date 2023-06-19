import axios from "axios"
import { productList } from "../Recoil/atoms"
import { useSetRecoilState } from "recoil"


const client = axios.create({
    baseURL: "https://localhost:7156/" 
  });

export const useFetchProductList = () => {
    const setProductList = useSetRecoilState(productList);
    const fetchProductsFromServer = async () => {
        await client.get('api/Product').then((response) => {
            setProductList(response.data);
         }).catch(err => console.log(err));
    }
    return fetchProductsFromServer;
}

export const useSendProductImageToAzureBlob = () => {
    const SendProductImageToAzureBlob = async (file: any) => {
        const formData = new FormData();
        formData.append("imageFile", file);
        client.post('api/File/upload', formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }}).catch(err => console.log(err));
    }
    return SendProductImageToAzureBlob;
}