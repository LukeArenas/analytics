import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {
  const [dates, setDates] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [impressions, setImpressions] = useState([])

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

  const fillImpressions = () => {
    let platformsImpressionsArray = []
    platforms.forEach((platform) => {
      let platformImpressions = []
      props.selectedProduct.forEach((ad) => {
        if (platform === ad.platform) {
          platformImpressions.push(ad.impressions)
        }
      })
      console.log(platform, platformImpressions)
      platformsImpressionsArray.push({
        platform: platform,
        impressions: platformImpressions
      })
    })
    setImpressions(platformsImpressionsArray)
  }

  useEffect(() => {
    createDateArray()
    fillPlatforms()
    fillImpressions()
  }, [])

  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Google',
              data: [12, 19, 3, 5, 2, 3]
            },
            {
              label: 'Amazon',
              data: [8, 10, 3, 6, 1, 0]
            }
          ]
        }}
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  )
}

export default LineGraph
