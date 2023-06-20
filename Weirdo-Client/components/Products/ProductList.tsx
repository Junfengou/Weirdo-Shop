import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRecoilValue } from 'recoil';
import { productList } from './Recoil/atoms';
import { useFetchProductList } from './hook/functions';

const ProductList: React.FC = () => {
  const productListRecoilState = useRecoilValue(productList);

  const fetchProductList = useFetchProductList();
  useEffect(() => {
    fetchProductList();
  }, [])

  return (
    <div className='mr-10'>
      <div className='flex flex-row justify-between items-center mt-2 mb-2'>
        <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Latest Products</h1>
        <Link href="/products/addproduct">
          <button type="button" className="mt-4 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Add Product
          </button>
        </Link>
      </div>

{/* md:grid-cols-2 sm:border-2 border-cyan-400 */}
      <div className='grid grid-cols-2 gap-4 content-normal'>
        {productListRecoilState?.products?.map(item => (
          <Link key={item?.id} href={`/products/${item?.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image width={100} height={100}  loading='lazy' className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={item?.imagePath} alt="image" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
                  <div>{"$"+item?.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList