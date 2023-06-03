import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getItemDetails } from "../api/products";

const ViewItem = () => {
    const { productName } = useParams();
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const itemId = getCookie("itemId");
            const data = await getItemDetails(itemId);
            setItemData(data[0]);
        };
        fetchData();
    }, []);

    function getCookie(name) {
        let cookieArr = document.cookie.split("; ");
        let cookieValue = cookieArr.find(row => row.startsWith(`${name}=`));
        return cookieValue ? cookieValue.split("=")[1] : null;
    }

    if (!itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="mb-5">Item View!</h1>
            <p>Product ID: {itemData.id}</p>
            <p>Product Name: {itemData.title}</p>
            <p>Product Description: {itemData.description}</p>
            <p>Product Cost: £{itemData.cost}</p>
            <p>Retailer: {itemData.retailer}</p>
            <a href={itemData.link} target="_blank">Purchase Here</a>
            
        </div>
    );
}

export default ViewItem;
