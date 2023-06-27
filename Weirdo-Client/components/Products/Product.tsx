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
    if(router.isReady)
      fetchProductItem(id);
    }, [router.isReady])

  return (
    <div className='flex flex-row mt-4 mr-10 ml-10 items-center justify-around content-center product-view-mobile:flex-col product-view-mobile:justify-center'>
      <div>
       {product?.imagePath && <Image className='border border-r-4 product-view-mobile:mb-5' src={product?.imagePath} height={270} width={270} alt="productImage" /> }
      </div>

      <div className='flex flex-col bg-slate-200 rounded-md h-96 w-80 ml-4 items-left product-view-mobile:ml-10 '>
        <div className='h-64 flex flex-col justify-evenly'>
          <h5 className='text-2xl font-bold tracking-tight text-gray-900 ml-4'>{product?.name}</h5>
          <p className='ml-4 mr-4'>{product?.description}</p>
          <p className='text-1xl font-bold tracking-tight ml-4 mr-4'>{transformToDollar(product?.price)}</p>
        </div>
      </div>
    </div>
  )
}

export default Product