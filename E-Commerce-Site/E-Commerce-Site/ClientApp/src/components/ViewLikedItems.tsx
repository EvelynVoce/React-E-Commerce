import React, { useState, useEffect } from 'react';
import {getLikedItems} from "../api/liked_items";
import ProductCards from "./ProductCards";
import Products from "../Models/Products";

interface ViewLikedItemsProps {
    userId: string;
}

const ViewLikedItems: React.FC<ViewLikedItemsProps> = ({ userId }) => {
    const [jsonData, setJsonData] = useState<Products[]>([]);
    const [effectTriggered, setEffectTriggered] = useState(false);
    const [likedItems, setLikedItems] = useState<Products[]>([]);
    
    useEffect(() => {
            const fetchData = async () => {
                if (userId) {
                    const liked_items = await getLikedItems(userId);
                    setLikedItems(liked_items);
                    setJsonData(liked_items);
                }
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