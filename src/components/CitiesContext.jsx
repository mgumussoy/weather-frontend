import { createContext, useState } from "react";

export const CitiesContext = createContext(null);


export const CitiesProvider = ({children}) => {

    // global state

    const[cities, setcities] =useState([]);


    return <CitiesContext.Provider value={{cities, setcities}}>{children}</CitiesContext.Provider>
}