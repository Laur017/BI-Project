/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Refresh from '../../assets/refresh.png'
import Plot from 'react-plotly.js';
import data from '../../data';

export default function SelectJob() {
    const [showGraph, setShowGraph] = useState(false);
    const [selectedJob, setSelectedJob] = useState('Developer');
    const [percentages, setPercentages] = useState();
    const n = data.length;

    let musicType = [];
    let jobType = [];
    for(let i of data){
        musicType.push(i.music_type)
        jobType.push(i.job)
    }
    musicType = [... new Set(musicType)];
    jobType = [... new Set(jobType)];

    const Options = jobType.map((i,indx) =>
        <option key={indx} value={i} onClick={() => setSelectedJob(i)}>{i}</option>
    )

    let countMusic = new Array(musicType.length).fill(0);  

    useEffect(() => {

        for(let i of data){
            if(i.job === selectedJob){
                countMusic[musicType.indexOf(i.music_type)]++;
            }
        }
        const per = countMusic.map(value => (value / n) * 100);
        setPercentages(per)

    },[selectedJob])




  return (
    <div className="div-select-job">
         <div className="upper-part" onClick={() => setShowGraph(!showGraph)}>
            <h1>Show data for a specific job </h1>
            <h1>{showGraph ? "-" : "+"}</h1>
        </div>
        <div className={`down-part ${showGraph && "show-down"}`}>
            <div>
                <h4>Select job: </h4>
                <select className='select-job'>
                    
                    {Options}
                </select>
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
                title: `Results for ${selectedJob}`, 
                plot_bgcolor:"transparent", 
                paper_bgcolor:"rgba(0,0,0,0)"}}
        />
        </div>
    </div>
  )
}
