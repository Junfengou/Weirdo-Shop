import React, { useEffect } from 'react'
import { useFetchOrderItem } from './hook/functions';
import { SignInResult, signinToken } from 'components/Auth/Recoil/atoms';
import { useRouter } from 'next/router';
import { Typography } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import { orderItemList } from './Recoil/atoms';
import moment from 'moment';
import OrderItem from './OrderItem';
import { transformToDollar } from 'helpers/helpers';

const Order = () => {
    const router = useRouter();
    const { id } = router.query;  
    const fetchOrderItems = useFetchOrderItem();
    const orderItemListState = useRecoilValue(orderItemList)

    useEffect(() => {
        if(router.isReady) {
            const SigninResultFromLocalStorage = localStorage.getItem('SignInResult') || '';
            if (SigninResultFromLocalStorage !== '') {
                const storedObject: SignInResult = JSON.parse(SigninResultFromLocalStorage);
                fetchOrderItems(storedObject.token, id);
            }
        }
    }, [router.isReady])
    return (
        <div>
            <div className='mt-2'>
                <div className='flex flex-row justify-between items-center content-center mb-14
                product-item-mobile:mb-8 product-item-mobile:flex-col product-item-mobile:gap-4
                '>
                <Typography variant="h4" color="blue-gray" className="ml-6 product-item-mobile:ml-0">
                    {orderItemListState?.result && "My order on "+ moment(orderItemListState.result[0].createdAt).format("MM/DD/YYYY")} 
                </Typography>

                <Typography variant="h6" color="blue" className="mr-8 product-item-mobile:mr-0">
                    {orderItemListState?.result && "Total price: " + transformToDollar(orderItemListState.result[0].totalPrice)}
                </Typography>

                </div>
                
                <div className='flex flex-col justify-center items-center content-center'>
                    {
                        orderItemListState?.result?.map((item, index) => (
                        <OrderItem
                            key={index}
                            id={item.id} 
                            imagePath={item.imagePath}
                            productName={item.productName}
                            productPrice={item.productPrice}
                            totalPrice={item.totalPrice}
                            quantity={item.quantity}
                            productId={item.productId}
                        />
                        ))
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default Order