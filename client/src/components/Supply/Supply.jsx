/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js'
import {media} from '../../data'

function Supply() {
  const [data,setData] = useState([])
  const [resFinal, setResFinal] = useState()



  useEffect(()=>{

    fetch('http://127.0.0.1:8000/api/v1/music-sales-data/average-per-mediatype-based-on-past-months')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));


  },[]) 

  useEffect(() => {

    const res = data.map(i => (
      {
        type:'bar', 
        x:i.months,
        y:i.avg,
        name: i.media_type
      }
    ))

    setResFinal(res)

  },[data])


  
  return (
    <div className='div-supply general-div'>
     <h4>Average Supply needed</h4>
     <Plot
        data={
          resFinal
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