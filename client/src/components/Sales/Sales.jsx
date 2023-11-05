/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js';
import { genres } from '../../data'

function Sales() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [traces, setTraces] = useState([]);
  const [data, setData] = useState([]);
  const [mediaLabel, setMediaLabel] = useState([])

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedValues((prevValues) => [...prevValues, name]);
    } else {
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== name));
    }

  };

  useEffect(()=>{

    fetch('http://127.0.0.1:8000/api/v1/music-sales-data/sales-evolution-based-on-quantities')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));


},[]) 
  
    useEffect(() => {

      const mlml = data.map((i,idx) => 
    (
        <label htmlFor={i.genre} key={idx}
        className={`label-sales ${selectedValues.includes(i.genre) ? 'checked-label' : ''}`}
      
        >
          <input type='checkbox' name={i.genre} onChange={handleCheckboxChange} className='input-sales' id={i.genre}/>
          {i.genre}
        </label>
      )
    )

    setMediaLabel(mlml)

    },[data])

  useEffect(() => {
    const selectedTraces = data
      .filter((genre) => selectedValues.includes(genre.genre))
      .map((genre) => ({
        x: genre.date,
        y: genre.salles,
        type: 'scatter',
        name: genre.genre,
      }));

    setTraces(selectedTraces);

  }, [selectedValues]);


  return (
    <div className='div-sales general-div'>
      <h3>Select one/more genre to see the sales evolution</h3>
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
    </div>
  );
}

export default transition(Sales);
 
