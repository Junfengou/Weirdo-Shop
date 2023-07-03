import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
  } from "@material-tailwind/react";
import { dialogState, signinToken } from "components/Auth/Recoil/atoms";
import { transformToDollar } from "helpers/helpers";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios"
import { cartItemList } from "components/Cart/Recoil/atom";

type Props = {
  name: string,
  desc: string,
  price: number,
  image: string,
  id: number | undefined
}
   
export default function HotItem(props: Props) {
  const {id, name, desc, price, image} = props;
  const signinTokenState = useRecoilValue(signinToken);
  const openLoginDialog = useSetRecoilState(dialogState);
  const setCartItemList = useSetRecoilState(cartItemList);

  const addToCart = async () => {
    if(!signinTokenState?.token)
      openLoginDialog(true)
    else {
      await axios.post( 
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_BASEURL}api/addToCart/productId/${id}`,
        {data: ""},
        {
          headers: {
            Authorization: `Bearer ${signinTokenState?.token}`,
            'Content-Type': 'application/json',
          },
        }
      ).then(res => setCartItemList(res.data))
      .catch(err => console.error(err));
    }
      
  }
  
  return (
    <Card className="w-72">
      <CardHeader shadow={false} floated={false} className="h-72">
        <Link key={id} href={`/products/${id}`}>
          <img 
            src={image} 
            className="w-full h-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {transformToDollar(price)}
          </Typography>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          {desc}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={addToCart}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}