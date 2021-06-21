import React, { useState, useEffect } from 'react'
import '../styles/AtAGlance.css'

const AtAGlance = (props) => {
  const [atAGlance, setAtAGlance] = useState({
    highImpressions: { highest: 0, product: '' },
    lowImpressions: { lowest: 0, product: '' },
    highConversion: { highest: 0, product: '' },
    lowConversion: { lowest: 0, product: '' },
    highClicks: { highest: 0, product: '' },
    lowClicks: { lowest: 0, product: '' }
  })

  const findAtAGlanceStats = () => {
    let lowestImpressions = props.productStats[0].totalImpressions
    let lowImpProduct = ''
    let highestImpressions = 0
    let highImpProduct = ''
    let lowestClicks = props.productStats[0].totalClicks
    let lowClickProduct = ''
    let highestClicks = 0
    let highClickProduct = ''
    let lowestConversion = 100
    let lowConProduct = ''
    let highestConversion = 0
    let highConProduct = ''
    props.productStats.forEach((product) => {
      //impressions
      if (product.totalImpressions < lowestImpressions) {
        lowestImpressions = product.totalImpressions
        lowImpProduct = product.product
      }
      if (product.totalImpressions > highestImpressions) {
        highestImpressions = product.totalImpressions
        highImpProduct = product.product
      }
      //clicks
      if (product.totalClicks < lowestClicks) {
        lowestClicks = product.totalClicks
        lowClickProduct = product.product
      }
      if (product.totalClicks > highestClicks) {
        highestClicks = product.totalClicks
        highClickProduct = product.product
      }
      //conversion
      const conversion =
        Math.round(
          (product.totalClicks / product.totalImpressions) * 100 * 100
        ) / 100
      if (conversion < lowestConversion) {
        lowestConversion = conversion
        lowConProduct = product.product
      }
      if (conversion > highestConversion) {
        highestConversion = conversion
        highConProduct = product.product
      }
    })

    setAtAGlance({
      highImpressions: { highest: highestImpressions, product: highImpProduct },
      lowImpressions: { lowest: lowestImpressions, product: lowImpProduct },
      highClicks: { highest: highestClicks, product: highClickProduct },
      lowClicks: { lowest: lowestClicks, product: lowClickProduct },
      highConversion: { highest: highestConversion, product: highConProduct },
      lowConversion: { lowest: lowestConversion, product: lowConProduct }
    })
  }

  useEffect(() => {
    findAtAGlanceStats()
  }, [])

  return (
    <div className="at-a-glance-page">
      <h3 className="title">At A Glance:</h3>
      <section>
        <div className="at-a-glance-card">
          <h4>Highest Conversion:</h4>
          <div className="flex">
            <p>Product: {atAGlance.highConversion.product}</p>
            <p>Conversion: {atAGlance.highConversion.highest}%</p>
          </div>
          <h4>Lowest Conversion:</h4>
          <div className="flex">
            <p>Product: {atAGlance.lowConversion.product}</p>
            <p>Conversion: {atAGlance.lowConversion.lowest}%</p>
          </div>
        </div>
        <div className="at-a-glance-card">
          <h4>Most Impressions:</h4>
          <div className="flex">
            <p>Product: {atAGlance.highImpressions.product}</p>
            <p>Impressions: {atAGlance.highImpressions.highest}</p>
          </div>
          <h4>Least Impressions:</h4>
          <div className="flex">
            <p>Product: {atAGlance.lowImpressions.product}</p>
            <p>Impressions: {atAGlance.lowImpressions.lowest}</p>
          </div>
        </div>
        <div className="at-a-glance-card">
          <h4>Most Clicks:</h4>
          <div className="flex">
            <p>Product: {atAGlance.highClicks.product}</p>
            <p>Clicks: {atAGlance.highClicks.highest}</p>
          </div>
          <h4>Least Clicks:</h4>
          <div className="flex">
            <p>Product: {atAGlance.lowClicks.product}</p>
            <p>Clicks: {atAGlance.lowClicks.lowest}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AtAGlance
