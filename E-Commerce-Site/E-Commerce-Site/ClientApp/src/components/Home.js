import React, { useState, useEffect, useRef } from 'react';
import {getProducts, getProductType} from '../api/products';
import ProductCards from './ProductCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [jsonData, setJsonData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
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
        let data = [];
        if (item === "All") {
            data = await getProducts();
        }
        else{
            data = await getProductType(item);
        }
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
        };
        fetchData();
    }, []);

    return (
        <div className="content">
            <div className="mb-5 my-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Get in loser, we're going shopping!</h1>
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faFilter} style={{ height: '25px' }} onClick={toggleDropdown}/>
                    {showDropdown && (
                        <div ref={dropdownRef} className="filter_dropdown">
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                <li className="dropdown-item" onClick={() => handleItemClick('All')}>. All</li>
                                <li className="dropdown-item" onClick={() => handleItemClick('Skirts')}>. Skirts</li>
                                <li className="dropdown-item" onClick={() => handleItemClick('Dresses')}>. Dresses</li>
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