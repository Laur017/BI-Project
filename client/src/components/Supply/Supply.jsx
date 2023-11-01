/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js'

function Supply() {
  return (
    <div className='div-supply general-div'>
      <Plot 
        data = {[{
          x:['2020', '2021', '2022', '2023'],
          y:[5, 3, 8, 12],
          type: 'scatter'
        }]}
      
      />
    </div>
  )
}

export default transition(Supply);