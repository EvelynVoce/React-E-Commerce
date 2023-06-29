import React, { useState, useEffect, useRef } from 'react';
import {getProducts, getProductType, getProductTypes, search} from '../api/products';
import ProductCards from './ProductCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../forms/SearchBar";

const Home = () => {
    const [jsonData, setJsonData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const handleItemClick = async (item) => {
        const data = item === "All" ? await getProducts() : await getProductType(item);
        setJsonData(data);
    };

    const handleSearch = async (searchTerm) => {
        const data = searchTerm === '' ? await getProducts() : await search(searchTerm);
        setJsonData(data);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setJsonData(data);
            const product_types = ['All', ...await getProductTypes()];
            setFilterOptions(product_types);
        };
        fetchData();
    }, []);

    return (
        <div className="content">
            <div className="mb-4 my-3 top-banner" >
                <h1>Get in loser, we're going shopping!</h1>
                <SearchBar onSearch={handleSearch} />
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faFilter} className="filter-icon" onClick={toggleDropdown}/>
                    {showDropdown && (
                        <div ref={dropdownRef} className="filter_dropdown">
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {filterOptions.map((option) => (
                                    <li key={option} className="dropdown-item" onClick={() => handleItemClick(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <ProductCards data={jsonData} />
        </div>
    );
};

export default Home;