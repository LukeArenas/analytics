import React from 'react'
import LineGraph from '../components/LineGraph'

const ProductDetail = (props) => {
  return (
    <div>
      <h1>Product {props.selectedProduct[0].product}</h1>
      <LineGraph {...props} />
    </div>
  )
}

export default ProductDetail
