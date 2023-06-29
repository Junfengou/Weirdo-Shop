import Product from 'components/Products/Product'
import { NextPage } from 'next'
import React, { Suspense } from 'react'

const IndividualPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Product />
      </Suspense>
    </div> 
  )
}

export default IndividualPage