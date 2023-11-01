/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js';

function Sales() {
  return (
    <div className='div-sales general-div'>
      <Plot 
        data ={[{
          values : [33,33,34],
          labels: ['React', 'Vue', 'Angular'],
          type: 'pie'
        }]}
        layout={{width:500, height:500, title: 'Simple pie chart'}}
      />
    </div>
  )
}

export default transition(Sales);