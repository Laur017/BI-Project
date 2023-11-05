/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {sales} from '../../data';
import Plot from 'react-plotly.js';

export default function SelectType() {
  const [showGraph, setShowGraph] = useState(false);
    const [selectedType, setSelectedType] = useState('CD');
    const [percentages, setPercentages] = useState();
    const [salesValue, setSalesValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [data, setData] = useState([]);
    const [mediaT, setMediaT] = useState([]);
    const [countries, setCountries] = useState([])
    const [options, setOptions] = useState()

    let n;
    // const countries = sales[0].country;
    let bulletSize = new Array(countries.length).fill(30);   

    let mediaType;


    useEffect(()=>{

      fetch('http://127.0.0.1:8000/api/v1/music-sales-data/country-musictypes-sales')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));

    },[showGraph]) 

    let Options;

  useEffect(() => {
    console.log(data)
    mediaType = []
    for(let i of data){
        mediaType.push(i.media_type)
    }
   setMediaT(mediaType)

   
  },[data])

    useEffect(() => {
      
      Options = mediaT.map((i,indx) =>
      <option key={indx} value={i} onClick={() => setSelectedType(i)}>{i}</option>
      )

      setOptions(Options)

    },[mediaT])

   

    useEffect(()=>{

      for(let i of data){
        if(i.media_type === selectedType){
            setSalesValue(i.sales)
            setCountries(i.countries)
        }
    }

      let m = Math.max.apply(null, salesValue)
      setMaxValue(m)

    },[selectedType, salesValue])


  return (
    <div className="div-select-type">
         <div className="upper-part" onClick={() => setShowGraph(!showGraph)}>
            <h1>Show selling data for a specific media type </h1>
            <h1>{showGraph ? "-" : "+"}</h1>
        </div>
        <div className={`down-part ${showGraph && "show-down"}`}>
            <div>
                <h4>Select media type: </h4>
                <select className='select-job'>
                    
                    {mediaT && options}
                </select>
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
    </div>  
  )
}
