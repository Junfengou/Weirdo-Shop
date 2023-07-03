import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { transformToDollar } from 'helpers/helpers'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { cartItemDeleteStatus } from './Recoil/atom'
import { useSetRecoilState } from 'recoil'

type Props = {
    id: string,
    imagePath: string,
    productName: string,
    productPrice: number,
    quantity: number,
    totalPrice: number,
    token: string | null,
    cartItemProductId: number
    cartItemId: number
  }

const CartItem = (props: Props) => {
    const {imagePath, productName, productPrice, quantity, cartItemId, token, cartItemProductId} = props
    const setCartItemDeleteSatus = useSetRecoilState(cartItemDeleteStatus);
    
    const deleteCartItem = async (cartItemId: number, token: string | null) => {
        await axios.delete( 
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL}api/deleteFromCart/productId/${cartItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
          // res.data.cartItemList.result
        ).then(res => setCartItemDeleteSatus(prev => !prev))
        .catch(err => console.error(err));
      }

    return (
        <Card className="flex-row w-full max-w-[48rem] h-full max-h-[14rem] mb-8
            product-item-mobile:flex-col product-item-mobile:max-w-[20rem]

        ">
            <CardHeader shadow={false} floated={false} 
            className="w-2/5 shrink-0 m-0 rounded-r-none 
            product-item-mobile:w-full product-item-mobile:max-h-[20rem]">
                <img 
                    src={imagePath} 
                    alt="image" 
                    className="w-full h-full object-cover"
                />
            </CardHeader>
        
            <CardBody>
            <Typography variant="h6" color="blue" className="uppercase mb-4">{transformToDollar(productPrice)}</Typography>
            
            <Typography variant="h4" color="blue-gray" className="mb-2">
                {productName}
            </Typography>

            <Typography color="blue-gray" className="font-medium mb-5">
                Quantity: {quantity} 
            </Typography>
                <Button onClick={() => deleteCartItem(cartItemId, token)} color="red">Remove item</Button>
            {/* <Button onClick={() => deleteCartItem(cartItemId, token)} color="red">Remove item</Button> */}
            </CardBody>
        </Card>
    )
    }

export default CartItem