import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRecoilValue } from 'recoil';
import { productList } from './Recoil/atoms';
import { useFetchProductList } from './hook/functions';
import { Button } from '@material-tailwind/react';
import HotItem from 'components/Home/HotItem';
import { signinToken } from "../Auth/Recoil/atoms"

const ProductList: React.FC = () => {
  const productListRecoilState = useRecoilValue(productList);
  const signinTokenState = useRecoilValue(signinToken);

  const fetchProductList = useFetchProductList();
  useEffect(() => {
    fetchProductList();
  }, [])

  return (
    <div className='mr-10'>
      <div className='flex flex-row justify-between items-center mt-2 mb-2 product-list-view-mobile-m:flex-col'>
        <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 ml-5'>Latest Products</h1>
        {/* TODO: Check if user is admin */}
        {signinTokenState?.token && (
          <Link href="/products/addproduct">
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              Add Product
            </Button>
          </Link>
        )}
      </div>
      <div className='grid grid-cols-3 gap-4 place-items-center ml-5 product-list-view-tablet-l:grid-cols-2 product-list-view-mobile-m:grid-cols-1'>
        {productListRecoilState?.products?.map(item => (
          <HotItem key={item.id} id={item.id} name={item.name} desc={item.description} price={item.price} image={item.imagePath} />
        ))}
      </div>
    </div>
  )
}

export default ProductList