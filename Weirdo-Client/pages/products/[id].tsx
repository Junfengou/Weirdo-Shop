import Product from 'components/Products/Product'
import { NextPage } from 'next'
import React from 'react'

const IndividualPage: NextPage = () => {
  return (
    <div className="container">
      <Product />
    </div>
  )
}

export default IndividualPage