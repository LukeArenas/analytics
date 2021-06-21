import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Graphs from '../components/Graphs'
import Doughnuts from '../components/Doughnuts'
import '../styles/ProductDetail.css'

const ProductDetail = (props) => {
  const [dates, setDates] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState(-1)

  const createDateArray = () => {
    let datesArray = []
    props.selectedProduct.forEach((ad) => {
      if (datesArray.indexOf(ad.date) < 0) {
        datesArray.push(ad.date)
      }
    })
    setDates(datesArray)
  }

  const fillPlatforms = () => {
    let platformArray = []
    props.selectedProduct.forEach((ad) => {
      if (platformArray.indexOf(ad.platform) < 0) {
        platformArray.push(ad.platform)
      }
    })
    setPlatforms(platformArray)
  }

  const changePlatformFilter = (e) => {
    setSelectedPlatform(parseInt(e.target.value))
  }

  useEffect(() => {
    createDateArray()
    fillPlatforms()
  }, [])

  return (
    <div>
      {props.selectedProduct[0] ? (
        <div className="flex">
          <h2 className="page-title">
            Product {props.selectedProduct[0].product}
          </h2>
          <form className="filter">
            <label>Filter By Platform:</label>
            <select onChange={(e) => changePlatformFilter(e)}>
              <option value="-1">All</option>
              {platforms.length
                ? platforms.map((platform, idx) => (
                    <option value={idx} key={idx}>
                      {platform}
                    </option>
                  ))
                : null}
            </select>
          </form>
          <Graphs
            {...props}
            platforms={platforms}
            dates={dates}
            selectedPlatform={selectedPlatform}
          />
          <Doughnuts
            {...props}
            platforms={platforms}
            dates={dates}
            selectedPlatform={selectedPlatform}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  )
}

export default ProductDetail
