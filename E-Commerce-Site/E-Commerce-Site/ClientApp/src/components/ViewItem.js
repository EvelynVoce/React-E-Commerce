import React from 'react';
import { useParams } from "react-router-dom";

const ViewItem = () => {
    const { productName } = useParams();
    const encodedProductName = productName.replace(/-/g, " ");

    function getCookie(name) {
        let cookieArr = document.cookie.split("; ");
        let cookieValue = cookieArr.find(row => row.startsWith(`${name}=`));
        return cookieValue ? cookieValue.split("=")[1] : null;
    }

    let itemId = getCookie("itemId");
    
    return (
        <div>
            <h1 className="mb-5">Item View!</h1>
            <p>Product ID: {itemId}</p>
            <p>Product Name: {encodedProductName}</p>
        </div>
    );
}

export default ViewItem;