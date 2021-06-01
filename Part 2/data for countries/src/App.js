import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'
import Weather from './components/Weather.js'

const App= () => {
const [ countries, setCountries ] = useState([])
const [ newFilter, setNewFilter ] = useState('')
const [ currentCapital, setcurrentCapital] = useState('')
const [ weather, setWeather] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div className="App">
       <p>filter shown with 
        <Filter handleFilterChange={(event) => handleFilterChange(event)} />
       </p>
       <Countries key={countries.numericCode}  setNewFilter={setNewFilter} countries={countries} newFilter={newFilter}></Countries>
       <Weather newFilter={newFilter} countries={countries} setcurrentCapital={setcurrentCapital} setWeather={setWeather} weather={weather} currentCapital={currentCapital}/>
    </div>
  );
}

export default App;
