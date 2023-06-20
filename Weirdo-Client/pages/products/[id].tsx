import Product from 'components/Products/Product'
import { NextPage } from 'next'
import React, { Suspense } from 'react'

const IndividualPage: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Product />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default IndividualPage