import Plot from "react-plotly.js"
import { useState, useEffect } from "react";
import Excel from '../../assets/excel.png'
import axios from "axios";

export default function Maps() {
    const [salesValue, setSalesValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([])

    let bulletSize = new Array(countries.length).fill(30); 


  useEffect(()=>{

    fetch('http://127.0.0.1:8000/api/v1/music-sales-data/country-musictypes-sales')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));

  },[])

  useEffect(()=>{

    for(let i of data){
      if(i.media_type === "CD"){
          setSalesValue(i.sales)
          setCountries(i.countries)
      }
  }

    let m = Math.max.apply(null, salesValue)
    setMaxValue(m)

  },[data])

  const handleClick = () =>{
    axios.post('http://localhost:8000/api/v1/exports/maps',{criteria:"mediatypesales"})
  }

  return (
    <div className="maps-div general-div">
      <h3>Maps</h3>
      <div>
        <div className="cr-maps">
          <label>
            Criteria for country exports :
            <select>
              <option>
                Media types sales
              </option>
              <option>
                Min / Max
              </option>
            </select>
          </label>
          {/* <h5>
            Minimum
            <input type="number"/>
            -
            <input type="number"/>
            Maximum
          </h5> */}
        </div>
       <Plot 
          data = {[{
            type: 'scattergeo',
            mode: 'markers',
            locations: countries,
            marker: {
                size: bulletSize,
                color: salesValue,
                cmin: 0,
                cmax: maxValue,
                colorscale: 'Plasma',
                colorbar: {
                    title: 'Total',
                    ticksuffix: '',
                    showticksuffix: 'last'
                },
                line: {
                    color: 'black'
                }
            },
            name: 'europe data'
        }]}
        layout = {{
          'geo': {
              'scope': 'world',
              'bgcolor': 'rgba(0,0,0,0)',
              'showland': true,
              'landcolor': 'white',
              'resolution': 50
          },
          plot_bgcolor:"transparent", 
          paper_bgcolor:"rgba(0,0,0,0)",
          width:800, 
          height:500
        }}
        />
        </div>
        <button className='excel-btn' onClick={handleClick}>Excel Export <img src={Excel}/></button>
    </div>
  )
}
