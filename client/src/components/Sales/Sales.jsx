/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js';
import Left from '../../assets/switch_l.png'
import Rigth from '../../assets/switch_r.png'
import Excel from '../../assets/excel.png'

function Sales() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [traces, setTraces] = useState([]);
  const [data, setData] = useState([]);
  const [mediaLabel, setMediaLabel] = useState([])
  const [totalSup, setTotalSup] = useState(true)

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
      // console.log(selectedValues)
  }, [selectedValues]);


  return (
    <div className='div-sales general-div'>
      <h3>Select one/more genre to see the <span>{totalSup ? 'average' : 'total'} </span>sales evolution</h3>
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
      <h5>Change the type of supply needed :  Average <img src={totalSup ? Left : Rigth}  onClick={() => setTotalSup(!totalSup)}/> Total</h5>
      {selectedValues &&
        <button className='excel-btn'>Excel Export <img src={Excel}/></button>
      }
    </div>
  );
}

export default transition(Sales);
 
