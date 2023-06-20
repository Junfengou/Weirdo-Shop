import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useFetchProductItem } from './hook/functions';
import { useRecoilValue } from 'recoil';
import { productItem } from './Recoil/atoms';
import {transformToDollar} from "../../helpers/helpers"

const Product = () => {
  const router = useRouter();
  const { id } = router.query;    
  const product = useRecoilValue(productItem);
  const fetchProductItem = useFetchProductItem();
  
  useEffect(() => {
      fetchProductItem(id);
    }, [])

  console.log(product)

  return (
    <div className='flex flex-row mt-4 mr-10 h-96 items-center justify-around content-center'>
      <div>
        <Image src={product.imagePath} height={370} width={370} alt="productImage" />
      </div>

      <div className='flex flex-col bg-slate-200 rounded-md h-96 w-80 ml-4 items-left '>
        <div className='h-64 flex flex-col justify-evenly'>
          <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-4'>{product.name}</h5>
          <p className='ml-4 mr-4'>{product?.description}</p>
          <p className='text-1xl font-bold tracking-tight ml-4 mr-4'>{transformToDollar(product?.price)}</p>
        </div>
      </div>
    </div>
  )
}

export default Product