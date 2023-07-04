import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemDeleteStatus, cartItemList } from './Recoil/atom';
import { SignInResult } from 'components/Auth/Recoil/atoms';
import axios from 'axios';
import { Button, Typography } from '@material-tailwind/react';
import { transformToDollar } from 'helpers/helpers';
import CartItem from './CartItem';
import OldCartItem from './OldCartItem';
import { OrderDrawer } from './OrderDrawer';

const Cart = () => {

  const [cartItemListRecoilState ,setCartItemList] = useRecoilState(cartItemList);
  const [authToken, setAuthToken] = useState<string | null>("")
  const cartItemDeleteStatusRecoilState = useRecoilValue(cartItemDeleteStatus)

  

  useEffect(() => {
    const SigninResultFromLocalStorage = localStorage.getItem('SignInResult') || '';
    if (SigninResultFromLocalStorage !== '') {
      const storedObject: SignInResult = JSON.parse(SigninResultFromLocalStorage);
      setAuthToken(storedObject.token);
      fetchCartItems(storedObject.token);
    }
  }, [cartItemDeleteStatusRecoilState])

  const fetchCartItems = async (token: string | null) => {
    await axios.get( 
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL}api/cartItems`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then(res => setCartItemList(res.data))
    .catch(err => console.error(err));
      
  }

  return (
    <div className=''>
      <div className='mt-2 ml-2'>
        <div className='flex flex-row justify-between items-center content-center mb-14'>
          <Typography variant="h4" color="blue-gray" className="ml-6">
            My Cart
          </Typography>

          <Typography variant="h6" color="blue-gray" className="">
            {cartItemListRecoilState?.cartItemList && "Total: " + transformToDollar(cartItemListRecoilState?.cartItemList[0]?.totalPrice)}
          </Typography>

          <OrderDrawer token={authToken} />
        </div>
        
{/*           border border-red-500 h-screen
          product-item-mobile:gap-justify-between */}
        <div className='flex flex-col justify-center items-center content-center
        '>
          {
            cartItemListRecoilState?.cartItemList?.map((item, index) => (
              <OldCartItem
                key={index}
                id={item.id} 
                imagePath={item.imagePath}
                productName={item.productName}
                productPrice={item.productPrice}
                totalPrice={item.totalPrice}
                quantity={item.quantity}
                token={authToken}
                cartItemProductId={item.cartItemProductId}
                cartItemId={item.cartItemId}
              />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Cart