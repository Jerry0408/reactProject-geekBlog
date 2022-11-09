import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'


export default function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()
  const chartInit = () => {
    let myChart = echarts.init(domRef.current)
    // Draw the chart
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: yData
        }
      ]
    })
  }
  useEffect(() => {
    chartInit()
  }, [])

  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}
