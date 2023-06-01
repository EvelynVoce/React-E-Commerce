import React from 'react';
import { useParams } from "react-router-dom";

const ViewItem = () => {
    const { productName } = useParams();
    const encodedProductName = productName.replace(/-/g, " ");
    
    return (
        <div>
            <h1 className="mb-5">Item View!</h1>
            <p>Product ID: {encodedProductName}</p>
        </div>
    );
}

export default ViewItem;