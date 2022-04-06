import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

function ForecastTab({coordinates}) {

    const [forecast, setForecast] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

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

    const getDay = (dayNum) => {
        const weekday = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        const d = new Date();
        let day = d.getDay();
        return weekday[(day + dayNum + 7) % 7];
    }

    const getDayFromTS = (timestamp) => {
        const day = new Date(timestamp * 1000);
        return day.toLocaleDateString('nl-NL', {weekday: 'long'});
    }

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
              {daily.temp.day}
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
