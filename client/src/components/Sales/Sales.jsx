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

  return (
    <div className='div-sales general-div'>
      <h3>Select one/more genre to see the sales evolution</h3>
      <div>
        <Plot data={traces} />
        <div className="checkbox-div-sales">
          <label htmlFor='pop'>
            <input type='checkbox' name='pop' onChange={handleCheckboxChange} />Pop
          </label>
          <label htmlFor='rock'>
            <input type='checkbox' name='rock' onChange={handleCheckboxChange} />Rock
          </label>
          <label htmlFor='rap'>
            <input type='checkbox' name='rap' onChange={handleCheckboxChange} />Rap
          </label>
          <label htmlFor='hip-hop'>
            <input type='checkbox' name='hip-hop' onChange={handleCheckboxChange} />Hip-hop
          </label>
          <label htmlFor='manea'>
            <input type='checkbox' name='manea' onChange={handleCheckboxChange} />Manea
          </label>
        </div>
      </div>
    </div>
  );
}

export default transition(Sales);
 

// [
//   {
//     x: ['2020', '2021', '2022', '2023'],
//     y: [5, 3, 8, 12],
//     type: 'scatter',
//     name: 'Trace 1'
//   },
//   {
//     x: ['2020', '2021', '2022', '2023'],
//     y: [2, 6, 10, 8],
//     type: 'scatter',
//     name: 'Trace 2'
//   }
// ]