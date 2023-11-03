/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import transition from '../../transition'
import Plot from 'react-plotly.js';
import { genres } from '../../data'

function Sales() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [traces, setTraces] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedValues((prevValues) => [...prevValues, name]);
    } else {
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== name));
    }
  };
  
  useEffect(() => {
    const selectedTraces = genres
      .filter((genre) => selectedValues.includes(genre.genre))
      .map((genre) => ({
        x: genre.date,
        y: genre.salles,
        type: 'scatter',
        name: genre.genre,
      }));

    setTraces(selectedTraces);

  }, [selectedValues]);

  const mediaLabel = genres.map((i,idx) => 
    (
      <label htmlFor={i.genre} key={idx}>
        <input type='checkbox' name={i.genre} onChange={handleCheckboxChange}/>
        {i.genre}
      </label>
    )
  )

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
 
