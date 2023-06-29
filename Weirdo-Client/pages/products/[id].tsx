import Product from 'components/Products/Product'
import ProductItem from 'components/Products/ProductItem'
import { NextPage } from 'next'
import React, { Suspense } from 'react'

const IndividualPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12 flex justify-center content-center">
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProductItem />
      </Suspense>
    </div> 
  )
}

export default IndividualPage