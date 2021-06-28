import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const Graphs = ({ platforms, dates, selectedProduct, selectedPlatform }) => {
  const [impressions, setImpressions] = useState([])
  const [clicks, setClicks] = useState([])
  const [conversions, setConversions] = useState([])

  const fillDataSets = (input) => {
    const platformColors = {
      Amazon: '#FF9900',
      Facebook: '#4267B2',
      Google: '#3cba54',
      LinkedIn: 'rgb(201, 152, 29)',
      Twitter: '#00acee'
    }
    //create an array that will be passed in as the data in the dataset object
    let platformsDataArray = []
    //access the value of the input for each object, push it into the array
    platforms.forEach((platform) => {
      let platformData = []
      selectedProduct.forEach((ad) => {
        if (platform === ad.platform) {
          platformData.push(ad[input])
        }
      })
      //create and push object into array
      platformsDataArray.push({
        label: platform,
        data: platformData,
        borderColor: platformColors[platform]
      })
    })
    //set array to state
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
    //loop through impressions and access the clicks, then calcluate the conversion based on those two values
    impressions.forEach((impressionArray, index) => {
      let platformConversion = []
      impressionArray.data.forEach((impression, subIdx) => {
        let conversion =
          Math.round((clicks[index].data[subIdx] / impression) * 100 * 100) /
          100
        //if value exists push to array, else if NaN, push 0 to array
        if (conversion) {
          platformConversion.push(conversion)
        } else {
          platformConversion.push(0)
        }
      })
      //create an object and push to array
      conversionArray.push({
        label: impressionArray.label,
        data: platformConversion,
        borderColor: platformColors[impressionArray.label]
      })
    })
    //set this array to state
    setConversions(conversionArray)
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
        <h2 className="chart-label">Impressions</h2>
        <div>
          {impressions.length && selectedPlatform >= 0 ? (
            <Line
              data={{
                labels: dates,
                datasets: [impressions[selectedPlatform]]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Line
              data={{
                labels: dates,
                datasets: impressions
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
      <div>
        <h2 className="chart-label">Clicks</h2>
        <div>
          {clicks.length && selectedPlatform >= 0 ? (
            <Line
              data={{
                labels: dates,
                datasets: [clicks[selectedPlatform]]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Line
              data={{
                labels: dates,
                datasets: clicks
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
      <div>
        <h2 className="chart-label">Conversions</h2>
        <div>
          {conversions.length && selectedPlatform >= 0 ? (
            <Line
              data={{
                labels: dates,
                datasets: [conversions[selectedPlatform]]
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Line
              data={{
                labels: dates,
                datasets: conversions
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

export default Graphs
