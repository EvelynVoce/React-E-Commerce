import React, { useState, useEffect } from 'react';
import {getLikedItems} from "../api/liked_items";
import ProductCards from "./ProductCards";


const ViewLikedItems = ({userId}) => {
    const [jsonData, setJsonData] = useState([]);
    const [effectTriggered, setEffectTriggered] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    
    useEffect(() => {
            const fetchData = async () => {
                if (userId) {
                    const liked_items = await getLikedItems(userId);
                    setLikedItems(liked_items);
                }
                const productList = await getLikedItems(userId);
                setJsonData(productList);
            };
            fetchData();
        }, [effectTriggered]);
    

    return (
        <div className="content" style={{ marginBottom: '100px' }}>
            <div className="mb-4 my-3 top-banner" >
                <h1>Liked Items</h1>
            </div>
            <ProductCards userId={userId} productData={jsonData} likedItems={likedItems}/>
        </div>
    );
};

export default ViewLikedItems;