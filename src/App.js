import React, { useState } from "react";
import axios from "axios";

import CurrentDay from "./components/CurrentDay/CurrentDay";
import FiveDays from "./components/FiveDays/FiveDays";

import './style.css';

// Смотреть wether3, 1:00:26

function App() {

	const [weather, setWeather] = useState({});
	const [weatherFive, setWeatherFive] = useState({});
	const [city, setCity] = useState('');
	const [temp, setTemp] = useState('C');
	const [five, setFive] = useState(false);
	const [day, setDay] = useState(1);

	const toDate = (date) => {
		return new Intl.DateTimeFormat('ru-Ru', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}).format(new Date(date));
	};

	const getWeather = () => {
		axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34b6d54c6dd254fa08d2038d0b44c57d`)
			.then(({ data }) => { setWeather(data) });
	};

	const getWeatherForFiveDay = () => {
		axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=34b6d54c6dd254fa08d2038d0b44c57d`)
			.then(({ data }) => { setWeatherFive(data) });
		setFive(true);
	};

	let days = JSON.stringify(weatherFive) === '{}' ? '' : weatherFive.list.map((item) => item.dt_txt.slice(0, 10));

	return (
		<main className="main">
			{!five ? <CurrentDay
				setDay={setDay}
				setCity={setCity}
				getWeather={getWeather}
				weather={weather}
				temp={temp}
				setTemp={setTemp}
				getWeatherForFiveDay={getWeatherForFiveDay}
				toDate={toDate}
			/>
				: <FiveDays
					setFive={setFive}
					day={day}
					setDay={setDay}
					weatherFive={weatherFive}
					days={days}
					weather={weather}
					temp={temp}
					setTemp={setTemp} />
			}
		</main>
	);
}

/**
 * ЛУГАНСК
 * https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b2ca3307092b85b25d3cf1352e7d7294&lat=48.5671&lon=39.3171&accuracy=1&tags=park&sort=relevance&extras=url_l&format=json
 * 
 */


/**
 * БИШКЕК
 * https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b2ca3307092b85b25d3cf1352e7d7294&lat=42.87&lon=74.59&accuracy=1&tags=square&sort=relevance&extras=url_l&format=json
 * 
 */

export default App;
