import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemList } from './Recoil/atom';
import { SignInResult, signinToken } from 'components/Auth/Recoil/atoms';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import { transformToDollar } from 'helpers/helpers';

const Cart = () => {
  const [cartItemListRecoilState ,setCartItemList] = useRecoilState(cartItemList);
  const [authToken, setAuthToken] = useState<string | null>("")

  useEffect(() => {
    const SigninResultFromLocalStorage = localStorage.getItem('SignInResult') || '';
    if (SigninResultFromLocalStorage !== '') {
      const storedObject: SignInResult = JSON.parse(SigninResultFromLocalStorage);
      setAuthToken(storedObject.token);
      fetchCartItems(storedObject.token);
    }
  }, [cartItemListRecoilState])

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
    <div className='mr-10'>
      <div className='flex flex-col justify-start mt-2 ml-2'>
        <div className='flex flex-row justify-between items-center mb-14'>
          <Typography
                variant="h4" color="blue-gray" className="ml-6"
          >
            My Cart
          </Typography>
          
          <div className='mr-10'>
            {cartItemListRecoilState?.cartItemList && ("Total: " + transformToDollar(cartItemListRecoilState?.cartItemList[0]?.totalPrice))}
          </div>
        </div>

        <div className='flex flex-col justify-center items-center content-center'>
          {
            cartItemListRecoilState?.cartItemList?.map((item, index) => (
              <CartItem 
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