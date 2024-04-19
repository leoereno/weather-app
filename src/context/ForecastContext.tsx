import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type Forecast = {
    temperature: number | null;
    fahrenheit: number;
    emoji?: string;
}

interface ForecastContextType {
    forecast: Forecast | null;
    setForecast: (React.Dispatch<React.SetStateAction<Forecast|null>>);
    hasForecast: boolean;
    setHasForecast: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ForecastProviderProps {
    children: ReactNode;
}


export const ForecastContext = createContext<ForecastContextType | undefined>(undefined);

export const ForecastProvider = ({children}: ForecastProviderProps) => {
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [hasForecast, setHasForecast] = useState(false);
    const onForecastChange = useEffect(() => {
        if(forecast !== null) setHasForecast(true);
    }, [forecast])

    return(
        <ForecastContext.Provider value={{ forecast, setForecast, hasForecast, setHasForecast }}>
            {children}
        </ForecastContext.Provider>
    )
};

export function useForecastContext() {
    const context = useContext(ForecastContext);
    if(!context) throw new Error("useForecastContext must be within ForecastProvider");

    return context;
}