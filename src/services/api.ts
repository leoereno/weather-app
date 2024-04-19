import { ICoordinates } from "../interfaces/ICoordinates/ICoordinates";

const geoCode_base_url = 'https://geocode.maps.co/search?q=';
const geoCode_api_key = process.env.REACT_APP_GEOCODE_KEY;

const baseUrl = "https://api.open-meteo.com/v1/forecast?";

export async function getWeather(userLocation: ICoordinates){
    const reqUrl = baseUrl + 
        `latitude=${Number(userLocation.latitude)}&longitude=${Number(userLocation.longitude)}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&forecast_days=1&timezone=America%2FSao_Paulo`;
    const response = await fetch(reqUrl);
    const data = await response.json();
    if(response.ok){
        console.log(response);
        return data;
    }
    return null;
}

export async function getCityCoords(name: string){
    const reqUrl = geoCode_base_url + name + "&api_key=" + geoCode_api_key;
    const response = await fetch(reqUrl);
    console.log(response)
    const data = await response.json();

    if (response.ok){
        console.log(data);
        return data;
    }
    return;
}