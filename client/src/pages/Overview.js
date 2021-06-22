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
      <h2 className="page-title">Campaign Overview</h2>
      {productStats.length ? <AtAGlance productStats={productStats} /> : null}

      <div className="content">
        <h3 className="section-title">Product List:</h3>
        <h4 className="subtitle">Click on card for details</h4>
        {productStats.length ? (
          <div className="flex card-container">
            {productStats.map((product, index) => (
              <div
                key={product.product}
                className="ad-card"
                onClick={() => handleClick(index, product.product)}
              >
                <h4 className="product-name">Product {product.product}</h4>
                <div className="stats">
                  <div>
                    <p className="label">Total Impressions:</p>
                    <p
                      className={
                        product.totalImpressions > 6000
                          ? 'label green'
                          : 'label red'
                      }
                    >
                      {product.totalImpressions}
                    </p>
                  </div>
                  <div>
                    <p className="label">Total Clicks:</p>
                    <p
                      className={
                        product.totalClicks > 700 ? 'label green' : 'label red'
                      }
                    >
                      {product.totalClicks}
                    </p>
                  </div>
                  <div>
                    <p className="label">Conversion:</p>
                    <p
                      className={
                        Math.round(
                          (product.totalClicks / product.totalImpressions) *
                            100 *
                            100
                        ) /
                          100 >
                        10.5
                          ? 'label green'
                          : 'label red'
                      }
                    >
                      {Math.round(
                        (product.totalClicks / product.totalImpressions) *
                          100 *
                          100
                      ) / 100}
                      %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Overview
