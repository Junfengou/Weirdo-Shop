import { useRecoilState, useSetRecoilState } from "recoil";
import { OrderForm } from "../OrderDrawer";
import axios from "axios";
import { cartItemList } from "../Recoil/atom";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL
});

export const useOrderForm = () => {
    const [cartItemListRecoilState, setCartItemList] = useRecoilState(cartItemList);
    const sendOrderForm = async (formData: OrderForm, token: string | null) => {
        await client.post('api/Order/createOrder', formData, {headers: {Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',}})
        .then((res) => setCartItemList(res.data))
        .catch(err => console.error(err))
    }
    return sendOrderForm;
}