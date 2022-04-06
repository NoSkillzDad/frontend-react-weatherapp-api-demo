import React, {useContext, useEffect, useState} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from "axios";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {Route, Routes} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import {TempContext} from "./context/TempProvider";

function App() {

    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('hilversum');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {kelvinToMetric} = useContext(TempContext);


    const getWeather = async (location) => {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(`http://localhost:8000/getweather/${location}`);
            // console.log(response.data);
            setWeatherData(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
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
                    {loading && <span>Loading...</span>}
                    {error && <span className={"wrong-location-error"}>
                       Oeps! Deze locatie bestaat niet
                    </span>}

                    <span className="location-details">

            <h2>{weatherData.weather[0].description}</h2>
            <h3>{weatherData.name}</h3>
            <h1>{kelvinToMetric(weatherData.main.temp)}</h1>

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
                        <Routes>
                            <Route path={"/komende-week"} element={<ForecastTab coordinates={weatherData.coord}/>}/>
                            <Route path={"/"} element={<TodayTab coordinates={weatherData.coord}/>}/>
                        </Routes>
                    </div>
                </div>
                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
