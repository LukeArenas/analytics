import React from 'react'
import LineGraph from '../components/LineGraph'

const ProductDetail = (props) => {
  return (
    <div>
      <h2>Product {props.selectedProduct[0].product}</h2>
      <LineGraph {...props} />
    </div>
  )
}

export default ProductDetail
