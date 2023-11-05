/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Refresh from '../../assets/refresh.png'
import Plot from 'react-plotly.js';
import {info} from '../../data';

export default function SelectJob() {
    const [showGraph, setShowGraph] = useState(false);
    const [selectedJob, setSelectedJob] = useState('journalist');
    const [percentages, setPercentages] = useState();
    const [data, setData] = useState([])
    const [musicT, setMusicT] = useState([])
    const [jobT, setJobT] = useState([])
    let n;

    let musicType;
    let jobType;
    

    useEffect(()=>{

        fetch(`http://127.0.0.1:8000/api/v1/music-sales-data/customers-music-associations?lower_age=20&upper_age=80`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));

    },[showGraph]) 

    useEffect(() => {
        musicType = [];
        jobType = [];
        for(let i of data){
            musicType.push(i.music_type)
            jobType.push(i.job)
        }
        musicType = [... new Set(musicType)];
        jobType = [... new Set(jobType)];

        setMusicT(musicType);
        setJobT(jobType);

        n = data.length;
        
    },[data,selectedJob])

    const Options = jobT.map((i,indx) =>
        <option key={indx} value={i} onClick={() => setSelectedJob(i)}>{i}</option>
    )

    let countMusic; 

    useEffect(() => {
        countMusic= new Array(musicT.length).fill(0); 
        for(let i of data){
            if(i.job === selectedJob){
                countMusic[musicT.indexOf(i.music_type)]++;
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
            labels: musicT,
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
