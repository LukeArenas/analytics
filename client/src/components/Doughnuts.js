import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

const Doughnuts = ({ platforms, dates, selectedProduct, selectedPlatform }) => {
  const [impressions, setImpressions] = useState({ data: [] })
  const [clicks, setClicks] = useState({})
  const [conversions, setConversions] = useState({})

  const fillDataSets = (input) => {
    const platformColors = {
      Amazon: '#FF9900',
      Facebook: '#4267B2',
      Google: '#3cba54',
      LinkedIn: 'rgb(201, 152, 29)',
      Twitter: '#00acee'
    }
    let platformsDataArray = []
    let platformColorsArray = []
    platforms.forEach((platform) => {
      let platformData = 0
      selectedProduct.forEach((ad) => {
        if (platform === ad.platform) {
          platformData += ad[input]
        }
      })
      platformsDataArray.push(platformData)
      platformColorsArray.push(platformColors[platform])
    })
    if (input === 'impressions') {
      setImpressions({
        data: platformsDataArray,
        backgroundColor: platformColorsArray
      })
    } else if (input === 'clicks') {
      setClicks({
        data: platformsDataArray,
        backgroundColor: platformColorsArray
      })
    }
  }

  const createConversionData = () => {
    let platformConversion = []
    impressions.data.forEach((impression, index) => {
      let conversion =
        Math.round((clicks.data[index] / impression) * 100 * 100) / 100
      if (conversion) {
        platformConversion.push(conversion)
      } else {
        platformConversion.push(0)
      }
    })
    setConversions({
      data: platformConversion,
      backgroundColor: impressions.backgroundColor
    })
  }

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
          {impressions.length && selectedPlatform >= 0 ? (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [{}]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [impressions]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
      <div>
        <h2>Clicks</h2>
        <div>
          {clicks.length && selectedPlatform >= 0 ? (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [{}]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [clicks]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
      <div>
        <h2>Conversions</h2>
        <div>
          {conversions.length && selectedPlatform >= 0 ? (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [{}]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Doughnut
              data={{
                labels: platforms,
                datasets: [conversions]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Doughnuts
