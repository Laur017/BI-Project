/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Refresh from '../../assets/refresh.png'
import data from '../../data';

export default function SelectYear() {
    const [showGraph, setShowGraph] = useState(false);
    const [minAge, setMinAge] = useState(1)
    const [maxAge, setMaxAge] = useState(99)
    const [resMin, setResMin] = useState(1)
    const [resMax, setResMax] = useState(99)
    const [percentages, setPercentages] = useState()
    const n = data.length;

    let musicType = [];
    for(let i of data){
        musicType.push(i.music_type)
    }
    musicType = [... new Set(musicType)];
    let countMusic = new Array(musicType.length).fill(0);   

    useEffect(()=>{
        for(let i of data){
            if(i.age >= resMin && i.age <= resMax){
                countMusic[musicType.indexOf(i.music_type)]++;
            }
        }
        const per = countMusic.map(value => (value / n) * 100);
        setPercentages(per)
    },[resMin,resMax])

    

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
            data ={[{
            values : percentages,
            labels: musicType,
            type: 'pie'
            }]}
            layout={{
                width:500, 
                height:500, 
                title: `Results between ${resMin} - ${resMax} years`, 
                plot_bgcolor:"transparent", 
                paper_bgcolor:"rgba(0,0,0,0)"}}
        />
        </div>
    </div>
  )
}
