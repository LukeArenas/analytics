import React, { useState, useEffect } from 'react'
import Graphs from '../components/Graphs'
import Doughnuts from '../components/Doughnuts'

const ProductDetail = (props) => {
  const [dates, setDates] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState('All')

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
      <h1>Product {props.selectedProduct[0].product}</h1>
      <form className="filter">
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
  )
}

export default ProductDetail
