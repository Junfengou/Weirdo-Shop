import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useFetchProductItem } from "./hook/functions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productItem } from "./Recoil/atoms";
import { useEffect } from "react";
import { transformToDollar } from "helpers/helpers";
import { dialogState, signinToken } from "components/Auth/Recoil/atoms";
   
  export default function ProductItem() {
    const router = useRouter();
    const { id } = router.query;    
    const product = useRecoilValue(productItem);
    const fetchProductItem = useFetchProductItem();
    const signinTokenState = useRecoilValue(signinToken);
    const openLoginDialog = useSetRecoilState(dialogState);

    const addToCart = () => {
      if(!signinTokenState?.token)
        openLoginDialog(true)
      else
        console.log("Add to cart")
    }

    useEffect(() => {
    if(router.isReady)
      fetchProductItem(id);
    }, [router.isReady])
    
    return (
        <Card className="flex-row w-full max-w-[48rem]">

        <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
          {product?.imagePath && <Image className='w-full h-full object-cover' src={product?.imagePath} height={270} width={270} alt="productImage" /> }
        </CardHeader>
        
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">Category Name</Typography>
          
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {product?.name}
          </Typography>

          <Typography color="gray" className="font-normal mb-8">
            {product?.description}
          </Typography>

          <Typography color="blue-gray" className="font-medium mb-5">
            {transformToDollar(product?.price)}
          </Typography>

          <a href="#" className="inline-block">
            <Button
                onClick={addToCart}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                Add to Cart
            </Button>
          </a>
        </CardBody>
      </Card>
    );
  }