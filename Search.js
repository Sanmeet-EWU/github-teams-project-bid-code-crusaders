import React, { useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


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
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <TouchableOpacity style={styles.searchButton} onPress={search}>
                <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
            </View>

            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 30,
        width: 200,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'normal',
    },
    searchButton: {
        width: 40,
        height:30,
        backgroundColor: '#a10022',
        padding: 5,
        alignItems: "center",
        borderRadius: 5,
        marginTop:10,
    },
    inputContainer: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "inline-flex",
        justifyContent: "center",
        marginBottom: 20,
    },
});

export default SearchBar;