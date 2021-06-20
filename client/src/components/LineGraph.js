import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {
  const [dates, setDates] = useState([])

  const createDateArray = () => {
    let datesArray = []
    props.selectedProduct.forEach((ad) => {
      if (datesArray.indexOf(ad.date) < 0) {
        datesArray.push(ad.date)
      }
    })
    setDates(datesArray)
  }

  useEffect(() => {
    createDateArray()
  }, [])

  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3]
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
