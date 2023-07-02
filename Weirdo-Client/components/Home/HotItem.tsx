import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
  } from "@material-tailwind/react";
import Link from "next/link";

type Props = {
  name: string,
  desc: string,
  price: number,
  image: string,
  id: number
}
   
export default function HotItem(props: Props) {
  const {id, name, desc, price, image} = props;
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
            {"$"+price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Typography>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          {desc}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
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