import React, { useEffect, useState } from 'react'
import "./WeatherApp.css"

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import Autosuggest from 'react-autosuggest';
const WeatherApp = () => {

    let api_key = "8281d040e295afe9d965afd086190102";

    const [wicon, setWicon] = useState(cloud_icon);
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const search = async () => {

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        }
        else {
            setWicon(clear_icon);
        }
    }


    // ... your existing state and functions
    const getSuggestions = async (inputValue) => {
        // You can fetch suggestions from an API or use static suggestions here
        // For example, I'm using some static suggestions:

        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    };

    const handleSuggestionsFetchRequested = async ({ value }) => {
        const newSuggestions = await getSuggestions(value);
        setSuggestions(newSuggestions);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (event, { newValue }) => {
        setInputValue(newValue);
    };

    const inputProps = {
        placeholder: 'Search',
        value: inputValue,
        onChange: handleChange,
    };


    return (
        <div className='container'>

            <div className={suggestions.length > 0 ? 'top-bar open-input' : "top-bar"}>
                <Autosuggest

                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={suggestion =>
                        <span onClick={() => {
                            setInputValue(suggestion.name);
                        }
                        }>
                            {suggestion.name}, {suggestion.state}, {suggestion.country}
                        </span>}
                    inputProps={inputProps}
                />
                {/* <input type='text' className='cityInput' placeholder='Search'></input> */}
                <div className='search-icon' onClick={() => { search() }}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt=''></img>
            </div>
            <div className='weather-temp'>24°c</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon'></img>
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon'></img>
                    <div className='data'>
                        <div className='wind-rate'>18 km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;