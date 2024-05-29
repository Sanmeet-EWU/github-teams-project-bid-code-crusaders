import React, { useState } from 'react';
import {StyleSheet} from "react-native";


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
                style={styles.input}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <button style={styles.button} onClick={search}>Go </button>

            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};
const styles = StyleSheet.create({
input:{
    fontSize:12,
},
});

export default SearchBar;