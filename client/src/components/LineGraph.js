import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {
  const [dates, setDates] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [impressions, setImpressions] = useState([])
  const [clicks, setClicks] = useState([])
  const [conversions, setConversions] = useState([])

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

  const createConversionData = () => {
    const platformColors = {
      Amazon: '#FF9900',
      Facebook: '#4267B2',
      Google: '#3cba54',
      LinkedIn: 'rgb(201, 152, 29)',
      Twitter: '#00acee'
    }
    let conversionArray = []
    impressions.forEach((impressionArray, index) => {
      let platformConversion = []
      impressionArray.data.forEach((impression, subIdx) => {
        let conversion =
          Math.round((clicks[index].data[subIdx] / impression) * 100 * 100) /
          100
        if (conversion) {
          platformConversion.push(conversion)
        } else {
          platformConversion.push(0)
        }
      })
      conversionArray.push({
        label: impressionArray.label,
        data: platformConversion,
        borderColor: platformColors[impressionArray.label]
      })
    })
    setConversions(conversionArray)
  }

  useEffect(() => {
    createDateArray()
    fillPlatforms()
  }, [])

  useEffect(() => {
    fillDataSets('impressions')
    fillDataSets('clicks')
  }, [platforms])

  useEffect(() => {
    createConversionData()
  }, [clicks])

  return (
    <div>
      <div>
        <h2>Impressions</h2>
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
      </div>
      <div>
        <h2>Clicks</h2>
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
      <div>
        <h2>Conversions</h2>
        <div>
          <Line
            data={{
              labels: dates,
              datasets: conversions
            }}
            height={400}
            width={600}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  )
}

export default LineGraph
