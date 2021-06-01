import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    let checklength = props.countries.filter(countries => countries.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    
    .map(countries => countries.captial)
    if (checklength.length === 1)
    {
        return ShowWeatherData(props)
    }
    else{
        return ""
    }
}

const ShowWeatherData = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    let currentCapital = props.countries.filter(countries => countries.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    .map(countries => countries.capital)
    let url = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + currentCapital 
    console.log(url)
    useEffect(() => {
        console.log('effect')
        axios
        .get(url)
        .then(response => {
            console.log('promise fulfilled')
            props.setWeather(response.data)
        })
    }, [])
    console.log(props.weather)
    return (
        <div>
            <h2>Weather in {currentCapital}</h2>
            Temperature: {props.weather.current?.temperature} Celsius<br/>
            <img alt="weather" src={props.weather.current?.weather_icons}/><br/>
            Wind: {props.weather.current?.wind_speed}mph direction {props.weather.current?.wind_dir}
        </div>
    )
}
export default Weather