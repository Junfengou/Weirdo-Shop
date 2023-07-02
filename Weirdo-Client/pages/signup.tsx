import Signup from 'components/Auth/Signup'
import { NextPage } from 'next'
import React from 'react'

const SignupPage: NextPage = () =>  {
  return (
    <div className="mx-auto max-w-screen-lg py-12">
      <div className='mb-12 ml-12 mr-12 overflow-hidden flex content-center justify-center'>
        <Signup />
      </div>
    </div>
  )
}

export default SignupPage