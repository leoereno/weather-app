import { IoLocationOutline } from "react-icons/io5";
import { getWeather } from "../../services/api";
import { ICoordinates } from "../../interfaces/ICoordinates/ICoordinates";
import { useContext, useEffect } from "react";
import { Forecast, ForecastContext, useForecastContext } from "../../context/ForecastContext";
import { useLoadingContext } from "../../context/loading-context";
import { getEmoji } from "../../services/emoji";
import { celsiusToF } from "../../services/utils";

async function getUserLocation (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    //forecast: number | null, 
    setForecast: React.Dispatch<React.SetStateAction<Forecast | null>> | undefined,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        e.preventDefault();
        const locale = navigator.geolocation;
        locale.getCurrentPosition(async (e) => {
            const userLocationCoords: ICoordinates = e.coords;
            console.log(userLocationCoords);
            const forecastResponse = await getWeather(userLocationCoords);
            const currentHour = new Date().getHours();
            const emoji = getEmoji(Number(forecastResponse.hourly.weather_code[currentHour]), currentHour);
            setForecast!({
                temperature:Math.round(forecastResponse.hourly.temperature_2m[currentHour]),
                emoji: emoji,
                fahrenheit: celsiusToF(forecastResponse.hourly.temperature_2m[currentHour])
            });
            setIsLoading(false);
        }
    );
    
}

export default function LocationButton(){
    const loading = useLoadingContext();
    const forecast = useForecastContext();
    return(
        <button 
            onClick={(e) =>{
                loading.setIsLoading(true);
                getUserLocation(e, forecast?.setForecast, loading.setIsLoading);
            }}
        >
            <IoLocationOutline className='text-white text-3xl'/>
        </button>
    )
}