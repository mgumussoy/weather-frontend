import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState, useContext } from "react";
import { CitiesContext } from './components/CitiesContext';

function App() {

  const [query, setQuery] = useState({ q: "ankara" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const {cities, setcities} = useContext(CitiesContext)
  

  useEffect(() => {
    const fetchWeather = async () => {

      try {

        query.units = units

        await getFormattedWeatherData(query).then((data) => {
  
          if(cities.includes(data.name)){
            moveCityFront(data.name)
          }else{
            addCityFront(data.name)
          }

          console.log(data);

          setWeather(data);
        });
        
      } catch (error) {

        console.log(error)

      }
      
    };

    fetchWeather();
  }, [query, units]);


  const moveCityFront = (first) => {

    let newCities = [...cities].sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
    setcities(newCities)
  }


  const addCityFront = city =>{

    let tempArr = [...cities]

    if(!(tempArr.includes(city))){
      tempArr.unshift(city)
    }
  
    setcities(tempArr)
  }

  const removeCity = city =>{ 
      setcities(prev =>{
          return prev.filter(x => x !== city)
      })
  }
  

  /*const fetchWeather = async () => {

    const data = await getFormattedWeatherData({q:'london'});

    console.log(data)

  };

  fetchWeather();*/


  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-8 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>

      <TopButtons setQuery={setQuery}/>

      <div className='px-32'>

        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

        {weather && (
          <div>
            <TimeAndLocation  weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            <Forecast items={weather.list}/>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
