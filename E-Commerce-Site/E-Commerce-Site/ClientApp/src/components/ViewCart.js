import React, { useState, useEffect } from 'react';
import CardCards from './CartCards';
import {getCartItems, getProductsInCart} from "../api/cart";
import CartCards from "./CartCards";

const ViewCart = ({userId}) => {
    const [jsonData, setJsonData] = useState([]);
    

    useEffect(() => {
            const fetchData = async () => {
                const productList = await getCartItems(userId);
                const productsInCart = await getProductsInCart(productList);
                setJsonData(productsInCart);
            };
            fetchData();
        }, 
        []);

    return (
        <div className="content">
            <div className="mb-4 my-3 top-banner" >
                <h1>Shopping Cart</h1>
            </div>
            <CartCards data={jsonData} />
            <h5 className="my-3">Total Cost: £{jsonData.reduce((sum, item) => sum + item.cost, 0)}</h5>
        </div>
    );
};

export default ViewCart;