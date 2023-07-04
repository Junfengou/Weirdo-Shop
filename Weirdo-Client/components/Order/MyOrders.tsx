import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useFetchOrder } from "./hook/functions";
import { SignInResult } from "components/Auth/Recoil/atoms";
import { useRecoilValue } from "recoil";
import { orderList } from "./Recoil/atoms";
import moment from "moment";
import { transformToDollar } from "helpers/helpers";
import Link from "next/link";
 
const TABLE_HEAD = ["Email", "Date", "Total Price", ""];
 
export default function MyOrder() {

    const fetchOrders = useFetchOrder();
    const orderListState = useRecoilValue(orderList);

    useEffect(() => {
        const SigninResultFromLocalStorage = localStorage.getItem('SignInResult') || '';
        if (SigninResultFromLocalStorage !== '') {
            const storedObject: SignInResult = JSON.parse(SigninResultFromLocalStorage);
            fetchOrders(storedObject.token);
        }
    }, [])

    return (
        <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
            <thead>
            <tr>
                {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    >
                    {head}
                    </Typography>
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {orderListState?.result?.map(({id, email, createdAt, totalPrice}, index) => (
                <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {email}
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {moment(createdAt).format('MM/DD/YYYY')}
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {transformToDollar(totalPrice)}
                        </Typography>
                    </td>
                    <td className="p-4">
                        <Link href={`/order/${id}`}>
                            <Typography variant="small" color="blue" className="font-medium">
                                Edit
                            </Typography>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </Card>
    );
}