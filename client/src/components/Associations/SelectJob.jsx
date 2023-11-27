/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Left from '../../assets/switch_l.png'
import Right from '../../assets/switch_r.png'
import Excel from '../../assets/excel.png'

export default function SelectJob() {
    const [showGraph, setShowGraph] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [percentages, setPercentages] = useState([]);
    const [data, setData] = useState([])
    const [musicT, setMusicT] = useState([])
    const [jobT, setJobT] = useState([])
    const [pieChart, setPieChart] = useState(true)
    const [chartMusicT, setChartMusicT] = useState([])
    const [chartMusicP, setChartMusicP] = useState([])
    const [quant, setQuant] = useState([])
    let n;

    let musicType;
    let jobType;
    

    useEffect(()=>{

        fetch(`http://127.0.0.1:8000/api/v1/music-sales-data/customers-music-associations?lower_age=20&upper_age=80`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));

    },[showGraph,selectedJob]) 

    useEffect(() => {
        let qq = [["<b></b>"]]
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

        for(let i in musicT){
            qq.push(["<b>"+ musicT[i] + "</b>"])
        }
        setChartMusicT(qq)

        n = data.length;

        countMusic= new Array(musicT.length).fill(0); 
        for(let i of data){
            if(i.job === selectedJob){
                countMusic[musicT.indexOf(i.music_type)]++;
            }
        }
        setQuant(countMusic)
        const per = countMusic.map(value => Math.round(((value / n) * 100) * 100) / 100 );
        setPercentages(per)

        let pp =[['Quantity','Procentages']]
        for(let i in percentages){
            pp.push([quant[i],((percentages[i] * n)/10).toFixed(2)])
        }
        setChartMusicP(pp)
        
    },[data,selectedJob])

    const Options = jobT.map((i,indx) =>
        <option key={indx} value={i} onClick={() => setSelectedJob(i)}>{i}</option>
    )

    let countMusic; 

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
                    <option>Select</option>
                    {Options}
                </select>
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
                    title: `${selectedJob && 'Results for'} ${selectedJob} `,
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
                        title: `${selectedJob && 'Results for'} ${selectedJob} `,
                        plot_bgcolor: 'transparent',
                        paper_bgcolor: 'rgba(0,0,0,0)'
                    }}
                    
                    />
                }
                {selectedJob &&
                    <button className='excel-btn'>Excel Export <img src={Excel}/></button>
                }
        </div>

    </div>
  )
}
