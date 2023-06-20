import AddProductForm from 'components/Products/AddProductForm'
import { NextPage } from 'next'
import React from 'react'

const AddProductPage: NextPage = () => {
  return (
    <div className="container">
        <div className="grid place-content-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <AddProductForm />
          </div>
        </div>
      </div>
  )
}

export default AddProductPage