
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Refresh from '../../assets/refresh.png'

export default function SelectYear() {
    const [showGraph, setShowGraph] = useState(false);
    const [minAge, setMinAge] = useState(1)
    const [maxAge, setMaxAge] = useState(99)
    const [resMin, setResMin] = useState(1)
    const [resMax, setResMax] = useState(99)
    const [percentages, setPercentages] = useState()
    const [data, setData] = useState([])
    const [musicT, setMusicT] = useState([])
    let n;

    let musicType = [];
    let countMusic;     

    useEffect(()=>{

        fetch(`http://127.0.0.1:8000/api/v1/music-sales-data/customers-music-associations?lower_age=${resMin}&upper_age=${resMax}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));


    },[resMin,resMax,showGraph]) 

    useEffect(() => {
        musicType = []
        for(let i of data){
            musicType.push(i.music_type)
        }
        setMusicT([... new Set(musicType)]);

        n = data.length;

        countMusic = new Array(musicT.length).fill(0);   

         for(let i of data){
            if(i.age >= resMin && i.age <= resMax){
                countMusic[musicT.indexOf(i.music_type)]++;
            }
        }

        const per = countMusic.map(value => (value / n) * 100);
        setPercentages(per)

        console.log(resMax, ' - ', resMin)
        console.log(musicT)
        console.log(per)
    },[data])

    const handleAge = () =>{
        setResMin(minAge);
        setResMax(maxAge);
    }

  return (
    <div className="div-select-year">
        <div className="upper-part" onClick={() => setShowGraph(!showGraph)}>
            <h1>Show data for a specifical interval of age </h1>
            <h1>{showGraph ? "-" : "+"}</h1>
        </div>
        
        <div className={`down-part ${showGraph && "show-down"}`}>
            <div>
                <div className="year-input">
                    <label htmlFor="min-age">Minimum age :
                    <input type='text' id='min-age' min="1" max="99" value={minAge} onChange={(e)=>setMinAge(e.target.value)}/>
                    </label>
                    <label htmlFor="max-age">Maximum age :
                    <input type='text' id='max-age' min="1" max="99" value={maxAge} onChange={(e)=>setMaxAge(e.target.value)}/>
                    </label>
                </div>
                <img src={Refresh} className='refresh-img' onClick={handleAge}/>
            </div>

                <Plot
                    data={[{
                    values: percentages,
                    labels: musicT,
                    type: 'pie'
                    }]}
                    layout={{
                    width: 500,
                    height: 500,
                    title: `Results between ${resMin} - ${resMax} years`,
                    plot_bgcolor: 'transparent',
                    paper_bgcolor: 'rgba(0,0,0,0)'
                    }}
                />

            <div id="chart"></div>
        </div>
    </div>
  )
}
