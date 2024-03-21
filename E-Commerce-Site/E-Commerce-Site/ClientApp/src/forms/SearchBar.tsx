import React, { useState } from 'react';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: { target: { value: any; }; }) => {
        const search = event.target.value
        setSearchTerm(search);
        onSearch(search);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
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
        </form>
    );
};

export default SearchBar;