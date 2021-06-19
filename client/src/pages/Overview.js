import React, { useEffect, useState } from 'react'

const Overview = (props) => {
  const [productStats, setProductStats] = useState([])

  //function to reduce the nested data into total impressions and total clicks by product
  const reduceData = () => {
    let productStatsArray = []
    props.products.map((array, index) => {
      let adImpressions = 0
      let adClicks = 0
      array.map((ad) => {
        adImpressions += ad.impressions
        adClicks += ad.clicks
      })
      const productStats = {
        product: array[0].product,
        totalImpressions: adImpressions,
        totalClicks: adClicks
      }
      productStatsArray.push(productStats)
    })
    setProductStats(productStatsArray)
  }

  useEffect(() => {
    reduceData()
  }, [])

  return (
    <div>
      <h2>Campaign Overview</h2>
      {productStats.length ? (
        <div>
          {productStats.map((product) => (
            <div key={product.product}>
              <h3>{product.product}</h3>
              <label>Total Impressions:</label>
              <h3>{product.totalImpressions}</h3>
              <label>Total Clicks:</label>
              <h3>{product.totalClicks}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Overview
