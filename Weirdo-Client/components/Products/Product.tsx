import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useFetchProductItem } from './hook/functions';
import { useRecoilValue } from 'recoil';
import { productItem } from './Recoil/atoms';

const Product = () => {
    const router = useRouter();
    const { id } = router.query;    
    const productItemRecoilState = useRecoilValue(productItem);
    const fetchProductItem = useFetchProductItem();
    
    useEffect(() => {
        fetchProductItem(id);
      }, [])

      console.log(productItemRecoilState)

  return (
    <div>Product</div>
  )
}

export default Product