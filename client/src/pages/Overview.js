import React, { useEffect, useState } from 'react'
import '../styles/Overview.css'

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
    <div className="overview-page flex">
      <h2 className="title">Campaign Overview</h2>
      <div className="content">
        {productStats.length ? (
          <div className="flex card-container">
            {productStats.map((product) => (
              <div key={product.product} className="ad-card">
                <h3>{product.product}</h3>
                <label>Total Impressions:</label>
                <h3
                  className={
                    product.totalImpressions > 6000
                      ? 'label green'
                      : 'label red'
                  }
                >
                  {product.totalImpressions}
                </h3>
                <label>Total Clicks:</label>
                <h3
                  className={
                    product.totalClicks > 700 ? 'label green' : 'label red'
                  }
                >
                  {product.totalClicks}
                </h3>
                <label>Conversion:</label>
                <p>
                  {Math.round(
                    (product.totalClicks / product.totalImpressions) * 100 * 100
                  ) / 100}
                  %
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Overview
