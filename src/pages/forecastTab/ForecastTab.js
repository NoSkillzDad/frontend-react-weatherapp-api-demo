import React, {useContext, useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import {getDayFromTS} from "../../helpers/dateHelpers";
import capitalize from "../../helpers/stringHelpers";
import {TempContext} from "../../context/TempProvider";

function ForecastTab({coordinates}) {

    const [forecast, setForecast] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {kelvinToMetric} = useContext(TempContext);

    const getForecast = async (coordinates) => {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(`http://localhost:8000/getforecast/${coordinates.lat}&${coordinates.lon}`);
            // console.log(response.data);
            setForecast(response.data.daily.slice(1, 6));
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
        toggleLoading(false);
    }

    useEffect(() => {
        getForecast(coordinates);
    }, [coordinates]);

    const renderDailyForecast = (forecast) => {
        // return forecast.map((daily, index) => (
        return forecast.map((daily) => (
            <article className="forecast-day" key={daily.dt}>
                <p className="day-description">
                    {/*{getDay(index)}*/}
                    {getDayFromTS(daily.dt)}
                </p>

                <section className="forecast-weather">
            <span>
              {kelvinToMetric(daily.temp.day)}
            </span>
                    <span className="weather-description">
              {capitalize(daily.weather[0].description)}
            </span>
                </section>
            </article>
        ))
    }


    return (
        <>
            {forecast.length === 0 && !error &&
                <span className={"no-forecast"}>
                    Zoek eerst een locatie om het weer voor deze week te bekijken
                </span>
            }
            {forecast &&
                <div className="tab-wrapper">
                        {loading && <span>Loading...</span>}
                        {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
                        {renderDailyForecast(forecast)}
                </div>
            }
        </>
    )
        ;
};

export default ForecastTab;
