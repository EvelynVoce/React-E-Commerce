import React, { useState, useEffect, useRef } from 'react';
import { getProducts } from '../api/products';
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

    const handleItemClick = (item) => {
        console.log(item);
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
        <div>
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
                                <li className="dropdown-item" onClick={() => handleItemClick('Shorts')}>. Shorts</li>
                                <li className="dropdown-item" onClick={() => handleItemClick('Leggings')}>. Leggings</li>
                                <li className="dropdown-item" onClick={() => handleItemClick('Bikinis')}>. Bikinis</li>
                                <li className="dropdown-item" onClick={() => handleItemClick('Cardigans')}>. Cardigans</li>
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