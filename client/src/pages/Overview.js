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
    </div>
  )
}

export default Overview
