import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {
  const [dates, setDates] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [impressions, setImpressions] = useState([])
  const [clicks, setClicks] = useState([])

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

  const fillDataSets = (input) => {
    const platformColors = {
      Amazon: '#FF9900',
      Facebook: '#4267B2',
      Google: '#3cba54',
      LinkedIn: 'rgb(201, 152, 29)',
      Twitter: '#00acee'
    }
    let platformsDataArray = []
    platforms.forEach((platform) => {
      let platformData = []
      props.selectedProduct.forEach((ad) => {
        if (platform === ad.platform) {
          platformData.push(ad[input])
        }
      })
      platformsDataArray.push({
        label: platform,
        data: platformData,
        borderColor: platformColors[platform]
      })
    })
    if (input === 'impressions') {
      setImpressions(platformsDataArray)
    } else if (input === 'clicks') {
      setClicks(platformsDataArray)
    }
  }

  useEffect(() => {
    createDateArray()
    fillPlatforms()
  }, [])

  useEffect(() => {
    fillDataSets('impressions')
    fillDataSets('clicks')
  }, [platforms])

  return (
    <div>
      <div>
        <Line
          data={{
            labels: dates,
            datasets: impressions
          }}
          height={400}
          width={600}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div>hello</div>
      <div>
        <Line
          data={{
            labels: dates,
            datasets: clicks
          }}
          height={400}
          width={600}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  )
}

export default LineGraph
