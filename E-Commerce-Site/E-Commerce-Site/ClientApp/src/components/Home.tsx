import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import {getProducts, getProductType, getProductTypes, search} from '../api/products';
// @ts-ignore
import ProductCards from './ProductCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import SearchBar from "../forms/SearchBar";
// @ts-ignore
import {getLikedItems} from "../api/liked_items";

interface HomeProps {
    userId: string;
}

const Home: React.FC<HomeProps> = ({ userId }) => {
    const [jsonData, setJsonData] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        console.log("Toggle");
        setShowDropdown(!showDropdown);
    };


    const handleItemClick = async (event: React.MouseEvent<HTMLLIElement>, item: string) => {
        console.log(item);
        const data = item === "All" ? await getProducts() : await getProductType(item);
        setJsonData(data);
    };

    const handleSearch = async (searchTerm: string) => {
        const data = searchTerm === '' ? await getProducts() : await search(searchTerm);
        setJsonData(data);
    };

    useEffect(() => {
        const handleClickOutside = (event: React.MouseEvent<Document>) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        // @ts-ignore
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // @ts-ignore
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, setShowDropdown]);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const liked_items = await getLikedItems(userId);
                setLikedItems(liked_items);
            }
            
            const data = await getProducts();
            setJsonData(data);
            
            const product_types: string[] = ['All', ...await getProductTypes()];
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
                                    <li key={option} className="dropdown-item" onClick={(event) => handleItemClick(event, option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <ProductCards userId={userId} productData={jsonData} likedItems={likedItems}/>
        </div>
    );
};

export default Home;