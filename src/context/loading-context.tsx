import { ReactNode, createContext, useContext, useState } from "react";

type LoadingContextProps = {
    children: ReactNode
}

type LoadingContext = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContext | null>(null);


export default function LoadingContextProvider({children}: LoadingContextProps){
    const [isLoading, setIsLoading] = useState(false);
    return(
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoadingContext(){
    const context = useContext(LoadingContext);
    if(!context) throw new Error ("useLoadingContext must be within LoadingContextProvider");

    return context;
}