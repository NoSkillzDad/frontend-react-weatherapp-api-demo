export const kelvinToCelsius = (kelvin) => (`${Math.round(kelvin - 273.15)} °C`);

export const kelvinToFahrenheit = (kelvin) => (`${Math.round((kelvin - 273.15) * 9/5 + 32)} °F`);
