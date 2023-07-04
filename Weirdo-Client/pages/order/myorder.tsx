import { Typography } from '@material-tailwind/react'
import MyOrders from 'components/Order/MyOrders'
import { NextPage } from 'next'
import React from 'react'

const OrderPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
        <div className='mt-2 ml-2'>
          <div className='flex flex-row justify-between items-center content-center mb-4'>
            <Typography variant="h4" color="blue-gray" className="ml-2">
              My Order List
            </Typography>
          </div>
          <MyOrders />
        </div>
    </div>
  )
}

export default OrderPage