import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AtAGlance from '../components/AtAGlance'
import '../styles/Overview.css'

const Overview = (props) => {
  const [productStats, setProductStats] = useState([])
  const history = useHistory()

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

  //handle clicked card to redirect to that product's detail page
  const handleClick = (index, product) => {
    props.setSelectedProduct(props.products[index])
    history.push(`/${product}`)
  }

  useEffect(() => {
    reduceData()
  }, [])

  return (
    <div className="overview-page flex">
      <h2 className="title">Campaign Overview</h2>
      {productStats.length ? <AtAGlance productStats={productStats} /> : null}

      <div className="content">
        <h3>Product List:</h3>
        {productStats.length ? (
          <div className="flex card-container">
            {productStats.map((product, index) => (
              <div
                key={product.product}
                className="ad-card"
                onClick={() => handleClick(index, product.product)}
              >
                <h4>Product {product.product}</h4>
                <label>Total Impressions:</label>
                <p
                  className={
                    product.totalImpressions > 6000
                      ? 'label green'
                      : 'label red'
                  }
                >
                  {product.totalImpressions}
                </p>
                <label>Total Clicks:</label>
                <p
                  className={
                    product.totalClicks > 700 ? 'label green' : 'label red'
                  }
                >
                  {product.totalClicks}
                </p>
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
