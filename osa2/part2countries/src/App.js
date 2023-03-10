import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY;


const api = {
  key : api_key,
  base : "https://api.openweathermap.org/data/2.5/"
}

const Name = ({country}) => {
  const [showState, setShowState] = useState(false)
  const [weather, setWeather] = useState([]);


  const searchWeather = () => {
    fetch(`${api.base}weather?q=${country.capital}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather([result.main.temp, result.wind.speed]);
      
    })

  }
  const showCountry = () => {
    if (showState === false) {
      return (
        <div>
          
        </div>
      )
    } else {
          console.log(`Painoit ${country.name.common}`)
          console.log(country)
          const listOfLangs = []
          Object.keys(country.languages).forEach(function(key, index) {
            listOfLangs.push(country.languages[key])
          })
          return (
            <div>
              <h1>{country.name.common}</h1>
              <br></br>
              Capital: {country.capital}
              <br></br>
              Area: {country.area}
              <br></br>
              Languages:
              <br></br>
              <ul>
                {listOfLangs.map(lang => <li key={lang}>{lang}</li>)}
              </ul>
              <br></br>
              <img src={country.flags.png} alt="Lippu"/>
              
              <h1>Weather in {country.capital}</h1>
              <button onClick={searchWeather}>Press to refresh weather data</button>
              <p>
                Temperature: {weather[0]} Celsius<br></br>
                Wind: {weather[1]} m/s
              </p>
            </div>
            
          )
      }
    }

    return (
      <li>
        {country.name.common}
        <button onClick={() => setShowState(!showState)}>
          Show
        </button>
        {showCountry()}
      </li>
    )
}

const Filter = (props) => {
  //console.log("FILTERIN", props)
  return (
    <div>
      find countries <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}




const App = () => {
  const [countries, setCountries] = useState([]) 
  const [showAll, setShowAll] = useState(false)
  const [filterDetails, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = showAll ? countries : countries.filter(country => country.name.common.includes(filterDetails))
  
  if (!showAll && countriesToShow.length === 1) {

    const listOfLanguages = []
    Object.keys(countriesToShow[0].languages).forEach(function(key, index) {
      listOfLanguages.push(countriesToShow[0].languages[key])
    })
    

    return (
      <div>
        <h2>Coutries</h2>
        <div>
          <Filter value={filterDetails} onChange={handleFilterChange}/>
        </div>
        <br></br>
        <div>
          <p>{countriesToShow[0].name.common}</p>
          <p>Capital {countriesToShow[0].capital}</p>
          <p>Area {countriesToShow[0].area}</p>
          <p>Languages:</p>
          <ul>
            {listOfLanguages.map(lang => <li key={lang}>{lang}</li>)}
          </ul>          
        </div>
        <div>
          <img src={countriesToShow[0].flags.png} alt="Lippu"/>
        </div>
        
      </div>
    )
  } else if (countriesToShow.length < 11) {

  return (
    <div>
      <h2>Coutries</h2>
      <div>
        <Filter value={filterDetails} onChange={handleFilterChange}/>
      </div>
      <br></br>
      <div>
        <ul>
          {countriesToShow.map(country => <Name key={country.name.common} country={country}/>)}
        </ul>
      </div>
      
    </div>
  )
  } else {
    return (
    <div>
      <h2>Coutries</h2>
      <div>
        <Filter value={filterDetails} onChange={handleFilterChange}/>
      </div>
      <br></br>
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    </div>
    )
  }

}

export default App