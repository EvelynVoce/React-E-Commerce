import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const search = event.target.value
        setSearchTerm(search);
        onSearch(search);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-style"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button type="submit" className="button-style">Search</button>
        </form>
    );
};

export default SearchBar;