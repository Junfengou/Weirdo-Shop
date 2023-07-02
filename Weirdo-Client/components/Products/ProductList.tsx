import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRecoilValue } from 'recoil';
import { productList } from './Recoil/atoms';
import { useFetchProductList } from './hook/functions';
import { Button } from '@material-tailwind/react';
import HotItem from 'components/Home/HotItem';

const ProductList: React.FC = () => {
  const productListRecoilState = useRecoilValue(productList);

  const fetchProductList = useFetchProductList();
  useEffect(() => {
    fetchProductList();
  }, [])

  return (
    <div className='mr-10'>
      <div className='flex flex-row justify-between items-center mt-2 mb-2 product-list-view-mobile-m:flex-col'>
        <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 ml-5'>Latest Products</h1>
        <Link href="/products/addproduct">
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            Add Product
          </Button>
        </Link>
      </div>
      <div className='grid grid-cols-3 gap-4 place-items-center ml-5 product-list-view-tablet-l:grid-cols-2 product-list-view-mobile-m:grid-cols-1'>
        {/* {productListRecoilState?.products?.map(item => (
          <Link key={item?.id} href={`/products/${item?.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
              {item?.imagePath && <Image width={100} height={100}  loading='lazy' className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item?.imagePath} alt="image" /> }
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item?.name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
                  <div>{"$"+item?.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              </div>
          </Link>
        ))} */}
        {productListRecoilState?.products?.map(item => (
          <Link key={item?.id} href={`/products/${item?.id}`}>
              <HotItem id={item.id} name={item.name} desc={item.description} price={item.price} image={item.imagePath} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList