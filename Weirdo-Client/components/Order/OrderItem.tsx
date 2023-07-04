import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { transformToDollar } from "helpers/helpers";
import Link from "next/link";
   

  type Props = {
    id: string,
    productId: number,
    productName: string,
    productPrice: number,
    quantity: number,
    totalPrice: number,
    // createdAt: string,
    // address: string,
    // city: string,
    // state: string,
    // zipCode: string,
    imagePath: string
  }
  

  export default function OrderItem(props: Props) {
    const {imagePath, productName, productPrice, quantity, productId } = props

    return (
      <Card className="flex-row h-full max-h-[15rem] w-full max-w-[32rem] mb-10 product-item-mobile:mb-16 w-">
        <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
          <Link href={`/products/${productId}`}>
            <img 
              src={imagePath} 
              alt="image" 
              className="w-full h-full object-cover"
            />
          </Link>
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">{transformToDollar(productPrice)}</Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {productName}
          </Typography>
          <Typography color="gray" className="font-normal mb-1">
            Quantity: {quantity} 
          </Typography>
        </CardBody>
      </Card>
    );
  }