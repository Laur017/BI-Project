/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js'
import {media} from '../../data'

function Supply() {
  const res = media.map(i => (
    {
      type:'bar', 
      x: i.months,
      y:i.sales,
      name: i.media_type
    }
  ))
  return (
    <div className='div-supply general-div'>
     <h4>Average Supply needed</h4>
     <Plot
        data={
          res
        }
        layout = {{
          plot_bgcolor:"transparent", 
          paper_bgcolor:"rgba(0,0,0,0)"
        }}
        />
    </div>
  )
}

export default transition(Supply);