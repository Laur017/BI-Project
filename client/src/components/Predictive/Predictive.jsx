import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Excel from '../../assets/excel.png'

export default function Predictive() {
  const [data,setData] = useState([])
  const [resFinal, setResFinal] = useState()




  useEffect(()=>{

    fetch(
      'http://127.0.0.1:8000/api/v1/music-sales-data/average-per-mediatype-based-on-past-months'
      )
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
    <div className="predictive-div general-div">
        <h2>Predictive analytics</h2>
        <div className="med-part-predictive">
        <div className="left-predictive-div">
            <label>
                Select sales data :
                <select>
                    <option>Genre-sales</option>
                    <option>Total-sales</option>
                </select>
            </label>
            <label>
                Options for predicitions :
                <select>
                    <option>Linear</option>
                    <option>Log</option>
                    <option>Exponential</option>
                    <option>Power</option>
                    <option>Polynomial</option>
                </select>
            </label>
            <label>
                Number of years to predict :
                <input type="number"></input>
            </label>
        </div>
        <div className="right-predictive-div">
            <Plot
            data={
                resFinal
            }
            layout = {{
                plot_bgcolor:"transparent", 
                paper_bgcolor:"rgba(0,0,0,0)"
            }}
            />
            <p>Notes: All the predicitions are happening into excel</p>
        </div>
        </div>
        <button className='excel-btn'>Excel Export <img src={Excel}/></button>
    </div>
  )
}
