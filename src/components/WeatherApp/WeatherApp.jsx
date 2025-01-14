import React, { useState } from 'react';
import { exampleWeatherData } from './DataWeather';

const WeatherApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term) {
            const filtered = exampleWeatherData.filter(data =>
                data.country.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border p-2 mb-4 w-full"
            />
            <ul className="list-disc pl-5">
                {filteredData.map(data => (
                    <li key={data.id} className="mb-2">
                        <span className="font-bold">{data.country}:</span>Temperature : {data.temperature}°C , Umidity : {data.humidity}% , WindSpeed : {data.windSpeed} km/h , Weather : {data.weather}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherApp;
