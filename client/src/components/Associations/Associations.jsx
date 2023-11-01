/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js'

function Associations() {
  return (
    <div className='div-associations general-div'>
      {/* <h1>Bar Plot</h1> */}
      <Plot data={[{
        x:[1,2,3], y:[1,2,3],
        type:'bar',
        mode: 'lines+markers',
        marker: {color: 'blue'}
      }]}
      layout={{width:600, height: 300, title: 'Simple Bar Plot'}}
      />
    </div>
  )
}

export default transition(Associations);
