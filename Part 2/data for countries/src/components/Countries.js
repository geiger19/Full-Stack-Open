import React from 'react'

const Countries = (props) => {
    
    console.log(props.newFilter)
    let checklength = props.countries.filter(countries => countries.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    
    if (props.newFilter === '' )
    {
        return NoCountries()
    }
    else if (checklength.length > 10)
    {
        return TooManyCountries()
    }
    else if (checklength.length === 1)
    {
        return JustOneCountry(props,props.newFilter)
    }
    return(
        props.countries.filter(countries => countries.name.toLowerCase().includes(props.newFilter.toLowerCase()))
                .map(countries =>  
        <p key={countries.numericCode}>{countries.name}
        &nbsp;<button  onClick={() => props.setNewFilter(countries.name)} >Show</button>
        </p>
      ))
  }
  const NoCountries = () =>{
      return(
          <div>No Countries to display</div>
      )
  }
  const TooManyCountries= () =>{
      return(
          <div>Too many Countries to display</div>
      )
  }
  const JustOneCountry = (props, filtervalue) => {
    console.log('Filtervalue',filtervalue)  
    console.log(props.countries)
    return(
        props.countries.filter(countries => countries.name.toLowerCase().includes(filtervalue.toLowerCase()))
        .map(countries =>
          
        <div key={countries.numericCode}>
            <h1>{countries.name}</h1>
            <h2>Country Data</h2>
            <strong>Captial:</strong> {countries.capital}<br/>
            <strong>Population:</strong> {countries.population}<br/>
            <h2>Languages</h2>
            <ul>
                {countries.languages.map(x => <li key={x.name}>{x.name}</li>)}
            </ul>
            <h2>Flag</h2>
        <img alt={countries.name} src={countries.flag}/>
        </div>
))
  }
export default Countries