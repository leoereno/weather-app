import { FaSearch } from "react-icons/fa";
import LocationButton from "../LocationButton/LocationButton";
import { useState } from "react";
import { getCityCoords, getWeather } from "../../services/api";
import { useLoadingContext } from "../../context/loading-context";
import { useForecastContext } from "../../context/ForecastContext";
import { celsiusToF } from "../../services/utils";
import { getEmoji } from "../../services/emoji";


export default function SearchBar(){
  
  const [inputText, setInputText] = useState<string>('');
  const loading = useLoadingContext();
  const forecast = useForecastContext();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputText.toString().trim().length === 0){
      alert("Please type a valid city name!");
      loading.setIsLoading(false); 
      return;
    } 
    const coords = await getCityCoords(inputText);
    const weather = await getWeather({latitude: coords[0].lat, longitude: coords[0].lon});
    const currentHour = new Date().getHours();
    const emoji = getEmoji(Number(weather.hourly.weather_code[currentHour]), currentHour);
    forecast.setForecast!({
        temperature:Math.round(weather.hourly.temperature_2m[currentHour]),
        emoji: emoji,
        fahrenheit: celsiusToF(weather.hourly.temperature_2m[currentHour])
    });
    console.log(coords[0].lat, coords[0].lon);
    loading.setIsLoading(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  
  return(
        <form className='m-2 border-2 p-4 rounded-lg flex flex-wrap items-center gap-2 opacity-80 hover:-translate-x-1 hover:-translate-y-1 transition-all' onSubmit={(e) => {loading.setIsLoading(true); handleSubmit(e)}}>
          <input className='bg-transparent rounded-lg p-4 focus:outline-none font-semibold text-white text-xl w-52 sm:w-auto' value={inputText} onChange={(e) => handleInputChange(e)} placeholder="Type a city name..."/>
          <button type='submit' className=''><FaSearch className='text-white text-3xl'/></button>
          <LocationButton />
        </form>
    );
}