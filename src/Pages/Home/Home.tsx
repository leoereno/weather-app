import { useContext, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Title from "../../components/Title/Title";
import { useForecastContext } from "../../context/ForecastContext";
import ForecastDisplay from "../../components/ForecastDisplay/ForecastDisplay";
import { useLoadingContext } from "../../context/loading-context";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home(){
    const weather = useForecastContext();
    const loading = useLoadingContext();

    useEffect(() => {
        if(!weather.forecast?.temperature) return;
        weather.setHasForecast(true);
    }, [weather.forecast?.temperature]);

    return(
        <div className='bg-city-sunset w-screen h-screen'>
        <div className='flex flex-col gap-4 items-center justify-center w-screen h-screen backdrop-blur-sm shadow-lg'>
            {weather?.hasForecast && weather.forecast?.temperature ? 
                <ForecastDisplay temperature={weather.forecast?.temperature} />
                :
                <>
                    <Title title="Weather App"/>
                    {!loading.isLoading && <SearchBar /> }
                </>                 
            }
            {loading.isLoading && <AiOutlineLoading className="animate-spin text-6xl text-white font-bold"/>}
        </div>
      </div>
    )
}