import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Excel from '../../assets/excel.png'
import axios from "axios";

export default function Predictive() {
  const [data,setData] = useState([])
  const [resFinal, setResFinal] = useState()
  const [dataset, setDataset] = useState("genre")
  const [type, setType] = useState("linear")
  const [years,setYears] = useState(1)
  const [polOrder, setPolOrder] = useState(2)



  useEffect(()=>{

    fetch(
      'http://127.0.0.1:8000/api/v1/music-sales-data/average-per-mediatype-based-on-past-months'
      )
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));


  },[]) 

  useEffect(() => {

    console.log(data)

    const res = data.map(i => (
      {
        type:'bar', 
        x:i.months,
        y:i.avg,
        name: i.media_type
      }
    ))

    setResFinal(res)

  },[data])

  useEffect(()=>{
    console.log(resFinal)
  },[resFinal])

  const handleClick = () =>{
    console.log(dataset)
    console.log(years)
    axios.post('http://localhost:8000/api/v1/exports/predictive',{dataset_name:dataset, type_of_predict:type, nr_years_to_predict: years + 1, poly_order:polOrder})
  }


  return (
    <div className="predictive-div general-div">
        <h2>Predictive analytics</h2>
        <div className="med-part-predictive">
        <div className="left-predictive-div">
            <label>
                Select sales data :
                <select onChange={(e) => setDataset(e.target.value)}>
                    <option value="genre">Genre-sales</option>
                    <option value="total">Total-sales</option>
                </select>
            </label>
            <label>
                Options for predicitions :
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="linear">Linear</option>
                    <option value="log">Log</option>
                    <option value="exponential">Exponential</option>
                    <option value="power">Power</option>
                    <option value="polynomial">Polynomial</option>
                </select>
            </label>
            {
                type === "polynomial" &&
                <label>
                Polynom order :
                <select onChange={(e) => setPolOrder(parseInt(e.target.value))}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            }
            <label>
                Number of years to predict :
                <input  onInput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type = "number"
                        maxLength = "2" 
                        value={years} 
                        onChange={(e) => setYears(parseInt(e.target.value))}>
                </input>
            </label>
        </div>
        <div className="right-predictive-div">
            <Plot
            data={
                resFinal
            }
            layout = {{
                plot_bgcolor:"transparent", 
                paper_bgcolor:"rgba(0,0,0,0)"
            }}
            />
            <p>Notes: All the predicitions are happening into excel</p>
        </div>
        </div>
        <button className='excel-btn' onClick={handleClick}>Excel Export <img src={Excel}/></button>
    </div>
  )
}
