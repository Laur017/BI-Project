/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Refresh from '../../assets/refresh.png'
import Left from '../../assets/switch_l.png'
import Right from '../../assets/switch_r.png'
import Excel from '../../assets/excel.png'

export default function SelectYear() {
    const [showGraph, setShowGraph] = useState(false);
    const [minAge, setMinAge] = useState(1)
    const [maxAge, setMaxAge] = useState(99)
    const [resMin, setResMin] = useState(1)
    const [resMax, setResMax] = useState(99)
    const [percentages, setPercentages] = useState([])
    const [data, setData] = useState([])
    const [musicT, setMusicT] = useState([])
    const [pieChart, setPieChart] = useState(true)
    const [chartMusicT, setChartMusicT] = useState([])
    const [chartMusicP, setChartMusicP] = useState([])
    const [quant, setQuant] = useState([])
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
        let qq = [["<b></b>"]]
        musicType = []
        for(let i of data){
            musicType.push(i.music_type)
        }
        setMusicT([... new Set(musicType)]);

        for(let i in musicT){
            qq.push(["<b>"+ musicT[i] + "</b>"])
        }
        setChartMusicT(qq)

        n = data.length;

        countMusic = new Array(musicT.length).fill(0);   

         for(let i of data){
            if(i.age >= resMin && i.age <= resMax){
                countMusic[musicT.indexOf(i.music_type)]++;
            }
        }
        setQuant(countMusic)
        const per = countMusic.map(value => Math.round(((value / n) * 100) * 100) / 100 );
        setPercentages(per)

    },[data])

    useEffect(() => {

        let pp =[['Quantity','Procentages']]
        for(let i in percentages){
            pp.push([quant[i], percentages[i]])
        }
        setChartMusicP(pp)
    },[percentages])

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
            <h5 className='pie-grid'>Pie Chart <img src={pieChart ? Left : Right}  onClick={() => setPieChart(!pieChart)}/> Table Grid</h5>

            {pieChart ? 
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
                :

                <Plot 
                data={[{
                    type: 'table',
                        header: {
                            values: chartMusicT,
                            align: "center",
                            line: {width: 1, color: 'black'},
                            fill: {color: "grey"},
                            font: {family: "Arial", size: 12, color: "white"}
                          },
                          cells: {
                            values: chartMusicP,
                            align: "center",
                            line: {color: "black", width: 1},
                            font: {family: "Arial", size: 11, color: ["black"]}
                          }
                    }]}
                    layout={{
                        width: 800,
                        height: 500,
                        title: `Results between ${resMin} - ${resMax} years`,
                        plot_bgcolor: 'transparent',
                        paper_bgcolor: 'rgba(0,0,0,0)'
                    }}
                    
                    />
                }
                <button className='excel-btn'>Excel Export <img src={Excel}/></button>

            <div id="chart"></div>
        </div>
    </div>
  )
}
