import { useEffect, useState } from "react"
import { useForecastContext } from "../../context/ForecastContext"
import { FaRedo } from "react-icons/fa";
import Switch from "react-switch";

interface WeatherDisplayProps {
    temperature: number | null | undefined
}

type Time = {
    date: string;
    time: string;
}

export default function WeatherDisplay(props: WeatherDisplayProps){

    const getDate = () => new Date().toLocaleDateString().replaceAll('/', '.');
    const getWeekDay = () => new Date().toLocaleTimeString().split(':').splice(0,2).join(':'); //hour

    const forecastContext = useForecastContext();
    const [fahrenheit, setFahrenheit] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<Time>({
        date: getDate(),
        time: getWeekDay()
    })
    const retry = () => {
        forecastContext.setHasForecast(false);
        forecastContext.setForecast(null);
    }

    useEffect(() => {
        setTimeout(() => {
            setCurrentTime({
                date: getDate(),
                time: getWeekDay()})
        }, 1000)
    },[currentTime])

    return(
        <div className="flex flex-col font-bold items-center text-center text-4xl text-slate-100 gap-5 bg-slate-200 p-12 rounded-xl backdrop-blur-md bg-opacity-15">
            <p className="text-2xl font-thin">{currentTime.date}</p>
            <p className="text-2xl font-thin">{currentTime.time}</p>

            <p className="text-6xl">{forecastContext.forecast?.emoji}</p>
            <p>{fahrenheit ? forecastContext?.forecast?.fahrenheit + "°F" : forecastContext?.forecast?.temperature + "°C"}</p>
            <div className="flex flex-row items-center gap-2">
                <span className="text-lg">°C</span>
                <Switch 
                    checked={fahrenheit} 
                    onChange={() => setFahrenheit(!fahrenheit)} 
                    onColor="#888"
                    checkedIcon={false}
                    uncheckedIcon={false}
                />
                <span className="text-lg">°F</span>
            </div>
            
            <span 
                className="cursor-pointer text-2xl hover:rotate-180 transition-transform" 
                title="Retry"
                onClick={() => retry()}
                ><FaRedo /></span>
        </div>
    )
}