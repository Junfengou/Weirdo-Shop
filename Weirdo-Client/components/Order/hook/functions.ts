import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import { orderList } from "../Recoil/atoms";


const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL
});

export const useFetchOrderItem = () => {
    const setOrder = useSetRecoilState(orderList);
    const fetchOrderssFromServer = async (token: string | null) => {
        await client.get(`api/Order/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }).then((response) => setOrder(response.data))
          .catch(err => console.error(err));
    }
    return fetchOrderssFromServer;
}