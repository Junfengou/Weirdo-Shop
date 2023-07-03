import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { transformToDollar } from "helpers/helpers";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItemDeleteStatus, cartItemList } from "./Recoil/atom";
   

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
  

  export default function CartItem(props: Props) {
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
      <Card className="flex-row h-52 w-full max-w-[32rem] mb-10">
        <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
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
          <Typography color="gray" className="font-normal mb-1">
            Quantity: {quantity} 
          </Typography>
          <Button onClick={() => deleteCartItem(cartItemId, token)} color="red">Remove item</Button>
        </CardBody>
      </Card>
    );
  }