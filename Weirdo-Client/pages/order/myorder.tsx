import { Typography } from '@material-tailwind/react'
import { signinToken } from 'components/Auth/Recoil/atoms'
import MyOrders from 'components/Order/MyOrders'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const OrderPage: NextPage = () => {
  
  const globalAuthState = useRecoilValue(signinToken);
  const router = useRouter()
  
  useEffect(() => {
    if(globalAuthState?.token == null || globalAuthState?.token == "")
      router.push("/")
  }, [globalAuthState])

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