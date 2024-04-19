import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Title from './components/Title/Title';
import { ForecastProvider } from './context/ForecastContext';
import Home from './Pages/Home/Home';
import LoadingContextProvider from './context/loading-context';

function App() {
  return (
    <ForecastProvider>
      <LoadingContextProvider>
        <Home />
      </LoadingContextProvider>
    </ForecastProvider>
    
  );
}

export default App;
