import React, { useState, useEffect } from 'react';
import {getCartItems, getProductsInCart} from "../api/cart";
import CartCards from "./CartCards";
import {Button} from "reactstrap";


const ViewCart = ({userId}) => {
    const [jsonData, setJsonData] = useState([]);
    

    useEffect(() => {
            const fetchData = async () => {
                const productList = await getCartItems(userId);
                setJsonData(productList);
            };
            fetchData();
        }, 
        []);

    return (
        <div className="content" style={{ marginBottom: '100px' }}>
            <div className="mb-4 my-3 top-banner" >
                <h1>Shopping Cart</h1>
            </div>
            <CartCards data={jsonData} />
            <div className="d-flex justify-content-center">
                <Button className="my-2 rounded-pill purchase-link cart-buy-button">Pay Now: £{jsonData.reduce((sum, item) => sum + (item.cost * item.quantity), 0)}</Button>
            </div>
        </div>
    );
};

export default ViewCart;