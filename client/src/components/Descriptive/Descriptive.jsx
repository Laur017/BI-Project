import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Left from '../../assets/switch_l.png'
import Rigth from '../../assets/switch_r.png'
import Excel from '../../assets/excel.png'
import axios from "axios";

export default function Descriptive() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [traces, setTraces] = useState([]);
  const [data, setData] = useState([]);
  const [mediaLabel, setMediaLabel] = useState([])
  const [totalSup, setTotalSup] = useState(true)
  const [firstColor, setFirstColor] = useState("#ff5a5f")
  const [secondColor, setSecondColor] = useState("#efbf38")
  const [thirdColor, setThirdColor] = useState("#a9ba9d")
  const[first, setFirst] = useState(1)
  const[second, setSecond] = useState(10)
  const[third, setThird] = useState(20)

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedValues((prevValues) => [...prevValues, name]);
    } else {
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== name));
    }

  };

  useEffect(()=>{

    fetch(`${totalSup ?
      'http://127.0.0.1:8000/api/v1/music-sales-data/sales-evolution-based-on-quantities':
      'http://localhost:8000/api/v1/music-sales-data/sales-evolution-based-on-totals'
    }`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));

    console.log(data)
    setSelectedValues([])
    setTraces([])

},[totalSup]) 
  
    useEffect(() => {

      const mlml = data.map((i,idx) => {
        console.log(selectedValues)
        console.log(i.genre)
      return (
        <label htmlFor={i.genre} key={idx}
        className={`label-sales ${selectedValues.includes(i.genre) ? 'checked-label' : ''}`}
      
        >
          <input type='checkbox' name={i.genre} onChange={handleCheckboxChange} className='input-sales' id={i.genre}/>
          {i.genre}
        </label>
      )}
    )

    const half = Math.ceil(mlml.length / 2);    
    const firstHalf = mlml.slice(0, half)

    setMediaLabel(firstHalf)

    },[data, selectedValues])

  useEffect(() => {
    const selectedTraces = data
      .filter((genre) => selectedValues.includes(genre.genre))
      .map((genre) => ({
        x: genre.date,
        y: genre.sales,
        type: 'scatter',
        name: genre.genre,
      }));

    setTraces(selectedTraces);
  }, [selectedValues]);

  const handleClick = () =>{

    axios.post('http://localhost:8000/api/v1/exports/descriptive',{dataset_name:totalSup ? "nrsales" : "total", criteria:[
      {
        field:"string",
        sign:">",
        value:first,
        color:firstColor
      },
      {
        field:"string",
        sign:"=",
        value:second,
        color:secondColor
      },
      {
        field:"string",
        sign:"<",
        value:third,
        color:thirdColor
      },
  ]})
  }

  return (
    <div className="descriptive-div general-div div-sales">
      <h3>Descriptive analytics</h3>
      <div>
        <Plot data={traces} 
          layout = {{
            plot_bgcolor:"transparent", 
            paper_bgcolor:"rgba(0,0,0,0)"
          }}
        />
        <div className="checkbox-div-sales">
          {mediaLabel}
        </div>
      </div>
      <h5>Sales evoution based on :  Number of sales <img src={totalSup ? Left : Rigth}  onClick={() => setTotalSup(!totalSup)}/> Total sales</h5>
      
      <h5>Criteria of analysis :</h5>
      <div className="descriptive-criteria">
        <div className="des-1">
          <h3>Sales {">"} </h3>
          <input type="number" value={first} onChange={(e)=> setFirst(parseInt(e.target.value))}></input>
           <input type="color" value={firstColor} onChange={(e) => setFirstColor(e.target.value)}/>
        </div>
        <div className="des-1">
          <h3>Sales {"="}</h3>
          <input type="number" value={second} onChange={(e)=> setSecond(parseInt(e.target.value))}></input>
          <input type="color" value={secondColor} onChange={(e) => setSecondColor(e.target.value)}/>
        </div>
        <div className="des-1">
          <h3>Sales {"<"}</h3>
          <input type="number" value={third} onChange={(e)=> setThird(parseInt(e.target.value))}></input>
          <input type="color" value={thirdColor} onChange={(e) => setThirdColor(e.target.value)}/>
        </div>
        
      </div>

        <button className='excel-btn' onClick={handleClick}>Excel Export <img src={Excel}/></button>

    </div>
  )
}
