/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js';
import { useState, useEffect } from 'react';

function Predicting() {
  const [data, setData] = useState([]);
  const [predicted, setPredicted] = useState([])
  const [months, setMonths] = useState([]);
  const [sales, setSales] = useState([])
  const [months2, setMonths2] = useState([]);
  const [sales2, setSales2] = useState([])
  const [yearRange, setYearRange] = useState(5);
  const [lastY, setLastY] = useState(2013)
  const [pre, setPre] = useState(false);

  useEffect(()=>{

    fetch('http://localhost:8000/api/v1/music-sales-data/sales-evolution')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));

  },[])
  
  useEffect(() =>{
    const m = data.map(i => i.date)
    setMonths(m)

    const s = data.map(i => i.total)
    setSales(s)
  },[data])

  useEffect(() =>{
    const m = predicted.map(i => i.date)
    setMonths2(m)

    const s = predicted.map(i => i.total)
    setSales2(s)

    setLastY(2013 + parseInt(yearRange))
  },[predicted])


  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/music-sales-data/predict-sales-evolution?nr_years=${yearRange}`)
    .then(response => response.json())
    .then(data => setPredicted(data))
    .catch(error => console.error(error));

  },[pre])


  return (
    <div className='div-predicting general-div'>
      <h3>Predicting for a certain number of years</h3>
      <div className="div-range">
        <h4>Predict for {yearRange} years </h4>
        <input type="range" min="1" max="10" value={yearRange} onChange={(e) => setYearRange(e.target.value)}/> 
        <button className='button-30' onClick={() => setPre(!pre)}> Predict</button>
      </div>
      <div className="div-plot-pred">
        <h5>Total Sales</h5>
        <Plot data={[
          {
            x: months,
            y: sales,
            type: "scatter",
            name: "2009 - 2013",
          },
          predicted && {
            x: months2,
            y: sales2,
            type: "scatter",
            name: `2014 - ${lastY}`,
          }
        ]} 
        layout = {{
          plot_bgcolor:"transparent", 
          paper_bgcolor:"rgba(0,0,0,0)",
          width:1000
        }}
        />
      </div>
    </div>
  )
}

export default transition(Predicting);