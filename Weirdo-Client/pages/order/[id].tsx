import { signinToken } from 'components/Auth/Recoil/atoms';
import Order from 'components/Order/Order'
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react'
import { useRecoilValue } from 'recoil';

const OrderItemPage: NextPage = () => {
  const globalAuthState = useRecoilValue(signinToken);
  const router = useRouter()
  
  useEffect(() => {
    if(globalAuthState?.token == null || globalAuthState?.token == "")
      router.push("/")
  }, [globalAuthState])
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Order />
      </Suspense>
    </div> 
  )
}

export default OrderItemPage