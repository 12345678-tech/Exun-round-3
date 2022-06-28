import React,{useState,useEffect} from 'react';
import './App.css';
import {Game} from "./Tic-tac-toe";


const initialState = [
  {
    person: "Ela",
    age: 48,
    name:""
  },
 
];

const green = "#39D1B4";
const yellow = "#FFD712";

function Person({ person, onClick, color, index }) {
 
  return (
    <>
      <h3>My name is {person.person}</h3>
      <button
        style={{ backgroundColor: color }}
        color={color}
        name={person.person}
        onClick={onClick}
        index={index}
      >
        Change color
      </button>
    </>
  );
}
export default function App() {
  const [person, setPerson] = useState(initialState);
  const [name, setName] = useState({});
  const [buttonColor, setButtonColor] = useState({0:green,1:green});
  const [country, setCountry] = useState([]);

  function handleColorChange(e,i) {
    console.log(i)
    const button = e.target.style.backgroundColor;
    const newButton = e.target.style.backgroundColor;
    const newColor = buttonColor[i] === green ? yellow : green;
    const newState ={...buttonColor,[i]:newColor}
    setButtonColor(newState);
    
  }
  function inputChangeHandle(event){
    let value= event.target.value;
    setName(value);


  }

  function getCountryName(){
    debugger
    fetch("https://api.nationalize.io?name="+name)
    .then(res => res.json())
    .then(
      (result) => {
        setCountry(result?.country[0]?.country_id)
      },
      (error) => {
      console.log(error);
      }
    )
  }
      
  return (
    <div className="App">
      {person.map((per, i) => {
      return (
        <div>  <Person
            color={buttonColor[i]}
            key={i}
            index={i}
            onClick={(e) => handleColorChange(e,i)}
            person={per}
          />
          <Game/>
        <div>
          <div className='from'>
 <input type="text" onChange={e => setName(e.target.value)}/> 
<button onClick={() => getCountryName()}>Get Country Name</button>
<p>Country Name: {country ? country : "Country is not associated with given input "}</p>

  </div>
          </div>
</div>
        );
      })}
    </div>
  );
}