
const { DateTime } = require("luxon");

const getWeatherData = (path, searchParams) => {
    const url = new URL(process.env.REACT_APP_BACKEND_URL + path);
    url.search = new URLSearchParams({ ...searchParams});

    console.log(url)
  
    return fetch(url).then((res) => {
      if ( res.ok ) {
        return res.json();
      } else {
          throw 'can not be received!';
      }
    });
};

const getCityNames = () => {
  const url = new URL(process.env.REACT_APP_BACKEND_URL + "/api/cityNames");

  return fetch(url).then((res) => {
    if ( res.ok ) {
      return res.json();
    } else {
        throw 'can not be received!';
    }
  });
};

  
const getFormattedWeatherData = async (searchParams) => {
  const formattedWeather = await getWeatherData(
    "/api/city",
    searchParams
  )

  return { ...formattedWeather};
};


const formatToLocalTime = (
  secs,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone('utc').toFormat(format);

const iconUrlFromCode = (code) =>
`http://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData

export { formatToLocalTime, iconUrlFromCode, getCityNames };