import AddProductForm from 'components/Products/AddProductForm'
import { NextPage } from 'next'
import React from 'react'

const AddProductPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-12 flex justify-center content-center">
      <AddProductForm />
    </div>
  )
}

export default AddProductPage