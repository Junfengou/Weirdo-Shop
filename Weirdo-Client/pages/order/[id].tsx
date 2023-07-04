import Order from 'components/Order/Order'
import { NextPage } from 'next'
import React, { Suspense } from 'react'

const OrderItemPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Order />
      </Suspense>
    </div> 
  )
}

export default OrderItemPage