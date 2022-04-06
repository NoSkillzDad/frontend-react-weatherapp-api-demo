import React, {useContext, useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import capitalize from "../../helpers/stringHelpers";
import {tsToHours} from "../../helpers/dateHelpers";
import {TempContext} from "../../context/TempProvider";

function TodayTab({ coordinates }) {

    const [today, setToday] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {kelvinToMetric} = useContext(TempContext);

    const getToday = async (coordinates) => {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(`http://localhost:8000/gettoday/${coordinates.lat}&${coordinates.lon}`);
            // console.log(response.data);
            // setToday(response.data.hourly);
			setToday([
				response.data.hourly[3],
				response.data.hourly[5],
				response.data.hourly[7]
			])
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
        toggleLoading(false);
    }

	useEffect(() => {
		getToday(coordinates);
	}, [coordinates]);

    return (
        <>
			{today.length === 0 && !error &&
				<span className={"no-forecast"}>
                    Zoek eerst een locatie om het weer voor deze week te bekijken
                </span>
			}
            {today &&
                <div className="tab-wrapper">
					{loading && <span>Loading...</span>}
					{error && <span>Er is iets misgegaan met het ophalen van de data</span>}




					<div className="chart">
						{today.map((hour) => (
							<WeatherDetail
							key = {hour.dt}
							temp = {hour.temp}
							type = {hour.weather[0].main}
							description = {capitalize(hour.weather[0].description)}
							/>
						))}
                    </div>
                    <div className="legend">
						{today.map((hour) => (
							<span key={`${hour.dt}`}>{tsToHours(hour.dt)}</span>
						))}
                        {/*<span>08:00 uur</span>*/}
                        {/*<span>12:00 uur</span>*/}
                        {/*<span>16:00 uur</span>*/}
                    </div>
                </div>
            }
        </>
    );
};

export default TodayTab;
