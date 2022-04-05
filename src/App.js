import React, {useEffect, useState} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from "axios";

function App() {

    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('hilversum');

    const getWeather = async (location) => {
        try {
                const response = await axios.get(`http://localhost:8000/getweather/${location}`);
                console.log(response.data);
                setWeatherData(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getWeather(location);
    }, []);

    useEffect(() => {
        getWeather(location);
    }, [location]);

    return (Object.keys(weatherData).length > 0 &&
        <>
            <div className="weather-container">


                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>

                    <span className="location-details">

            <h2>{weatherData.weather[0].description}</h2>
            <h3>{weatherData.name}</h3>
            <h1>{weatherData.main.temp}</h1>

            <button type="button" onClick={getWeather}>
            {/*<button type="button" onClick={fetchData}>*/}
                Haal data op!
            </button>
          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        Alle inhoud van de tabbladen komt hier!
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
