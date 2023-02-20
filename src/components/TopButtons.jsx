import React, { useContext, useEffect, useState } from 'react'
import { getCityNames } from '../services/weatherService'
import { CitiesContext } from './CitiesContext'

function TopButtons({setQuery}) {

    const [currentPage, setcurrentPage] = useState(process.env.REACT_APP_CURRENT_PAGE)
    const [cityPerPage, setcityPerPage] = useState(process.env.REACT_APP_CITY_PER_PAGE)
    const {cities, setcities} = useContext(CitiesContext)

    const lastCityIndex = currentPage * cityPerPage
    const firstCityIndex = lastCityIndex - cityPerPage

    const currentCities = cities.slice(firstCityIndex, lastCityIndex)

    const pageSize = Math.ceil(cities.length / cityPerPage)

    useEffect(() => {
        async function fetchData() {
            let response = await getCityNames()
            return response
        }
        fetchData().then(response => setcities(response.cities))
    }, [])

    
    const prevPage = () =>{

        let newPage = currentPage - 1

        if(newPage < 1){

            newPage = 1

        }

        setcurrentPage(newPage)

    }

    const nextPage = () =>{

        let newPage = currentPage + 1

        if(newPage > pageSize){

            newPage = pageSize

        }

        setcurrentPage(newPage)

    }


  return (
    <div class="flex items-center justify-between pt-3">

            <div class="flex items-center text-white hover:text-black cursor-pointer">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-lg font-medium leading-none ml-3" onClick={prevPage}>Previous</p>                    
            </div>
           
            { 
                currentCities && currentCities.map((city, index) => (

                <button key={index} className="text-white text-lg font-medium leading-none cursor-pointer hover:text-black mx-2"
                onClick={() => setQuery({q: city})}>{city}</button>

            ))
            }
            
            <div class="flex items-center text-white hover:text-black cursor-pointer">
                <p class="text-lg font-medium leading-none mr-3" onClick={nextPage}>Next</p>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
            </div>
    </div>)

}

export default TopButtons