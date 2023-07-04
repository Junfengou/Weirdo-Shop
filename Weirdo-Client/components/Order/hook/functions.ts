import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import { orderItemList, orderList } from "../Recoil/atoms";


const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL
});

export const useFetchOrder = () => {
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

export const useFetchOrderItem = () => {
  const setOrderItemList = useSetRecoilState(orderItemList);
  const fetchOrderssFromServer = async (token: string | null, orderId: string | string[] | undefined) => {
      await client.get(`api/Order/orderItems/orderId/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => setOrderItemList(response.data))
        .catch(err => console.error(err));
  }
  return fetchOrderssFromServer;
}