import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

function ForecastTab({coordinates}) {

    const [forecast, setForecast] = useState([]);

    const getForecast = async (coordinates) => {
        try {
            const response = await axios.get(`http://localhost:8000/getforecast/${coordinates.lat}&${coordinates.lon}`);
            console.log(response.data);
            setForecast(response.data.daily.slice(1, 6));
        } catch (e) {
            console.error(e);
        }
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
            {forecast &&
                <div className="tab-wrapper">
                    {renderDailyForecast(forecast)}
                </div>
            }
        </>
    )
        ;
};

export default ForecastTab;
