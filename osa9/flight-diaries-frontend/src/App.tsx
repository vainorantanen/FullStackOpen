import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAll, create } from "./service/flightService";
import { Visibility, Weather } from "./types";


const App = () => {
  const [flights, setFlights] = useState<DiaryEntry[]>([])
  const [newFlight, setNewFlight] = useState<DiaryEntry>();
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState<{ message: string, type: string } | null>(null);

  useEffect(() => {
    getAll().then(data => {
      setFlights(data)
    })
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    create({ 
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment
     }).then(data => {
      setFlights(flights.concat(data))
    }).catch(error => {
      showNotification(`Failed to create diary entry: ${error.response.data.message}`, "error");
    });

    setDate('')
    setComment('')
    setWeather('')
    setVisibility('')
    setNewFlight(undefined);
  };
  

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };


  return (
    <div>
      <h1>Add a new entry</h1>
      <div>
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

      </div>
      <div>
      <form onSubmit={diaryCreation}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br></br>
        <label>Visibility:</label>
        <div>
          <label>
            <input
              type="radio"
              value={Visibility.Great}
              checked={visibility === Visibility.Great}
              onChange={() => setVisibility(Visibility.Great)}
            />
            Great
          </label>
          <label>
            <input
              type="radio"
              value={Visibility.Good}
              checked={visibility === Visibility.Good}
              onChange={() => setVisibility(Visibility.Good)}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              value={Visibility.Ok}
              checked={visibility === Visibility.Ok}
              onChange={() => setVisibility(Visibility.Ok)}
            />
            Ok
          </label>
          <label>
            <input
              type="radio"
              value={Visibility.Poor}
              checked={visibility === Visibility.Poor}
              onChange={() => setVisibility(Visibility.Poor)}
            />
            Poor
          </label>
        </div>

        <br></br>
        <label>Weather:</label>
        <div>
          <label>
            <input
              type="radio"
              value={Weather.Sunny}
              checked={weather === Weather.Sunny}
              onChange={() => setWeather(Weather.Sunny)}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              value={Weather.Cloudy}
              checked={weather === Weather.Cloudy}
              onChange={() => setWeather(Weather.Cloudy)}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              value={Weather.Rainy}
              checked={weather === Weather.Rainy}
              onChange={() => setWeather(Weather.Rainy)}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              value={Weather.Stormy}
              checked={weather === Weather.Stormy}
              onChange={() => setWeather(Weather.Stormy)}
            />
            Stormy
          </label>
          <label>
            <input
              type="radio"
              value={Weather.Windy}
              checked={weather === Weather.Windy}
              onChange={() => setWeather(Weather.Windy)}
            />
            Windy
          </label>
        </div>


        <br></br>
        <label>Comment:</label>
        <input 
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
      <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
      <h1>Diary entries</h1>
      {flights.map(flight => (
        <div key={flight.id}>
          <h3>{flight.date}</h3>
          <p>Visibility: {flight.visibility}</p>
          <p>Weather: {flight.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;