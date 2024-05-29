import React, { useState } from 'react';


const SearchBar = ({ data }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const search = () => {
        const filteredResults = data.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <button onClick={search}>Search </button>

            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;