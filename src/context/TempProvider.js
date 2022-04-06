import React, {createContext, useState} from "react";
import {kelvinToCelsius, kelvinToFahrenheit} from "../helpers/tempConversions";

export const TempContext = createContext(null);

const TempContextProvider = ({ children }) => {
    const [selectMetric, toggleSelectMetric] = useState(true);

    const toggleTemp = () => {
        toggleSelectMetric(!selectMetric);
    }

    return (
        <TempContext.Provider value={{
            toggleTemp: toggleTemp,
            kelvinToMetric: selectMetric ? kelvinToFahrenheit : kelvinToCelsius
        }}
        >
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;