import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function Forecast({items}) {
  return (
    <div>
        <div className="flex items-center justify-start mt-6">
            <p className="text-white font-medium uppercase">3 Hour Interval Forecast</p>
        </div>
        <hr className="my-2" />

        <div className="flex flex-row items-center justify-between text-white">

            {/*<div
                className="flex flex-col items-center justify-center"
            >
                <p className="font-light text-sm text-center">Tue <br/>4:30 PM</p>
                <img
                src="https://openweathermap.org/img/wn/01d@2x.png"
                className="w-12 my-1"
                alt=""
                />
                <p className="font-medium">35°</p>
            </div>*/}

            {items.map((item, index) => (
            <div
                key={index}
                className="flex flex-col items-center justify-center"
            >
                <p className="font-light text-sm text-center">{item.day}<br/>{item.time}</p>
                <img
                src={iconUrlFromCode(item.icon)}
                className="w-12 my-1"
                alt=""
                />
                <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
            </div>
            ))}
            
        </div>

    </div>
  )
}

export default Forecast