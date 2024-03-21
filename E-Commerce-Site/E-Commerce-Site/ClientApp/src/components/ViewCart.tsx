import React, { useState, useEffect } from 'react';
import {getCartItems} from "../api/cart";
import CartCards from "./CartCards";
import {Button} from "reactstrap";
import cart from "../Models/Cart";


interface ViewCartProps {
    userId: string;
}

const ViewCart: React.FC<ViewCartProps> = ({ userId }) => {
    const [jsonData, setJsonData] = useState<cart[]>([]);
    const [effectTriggered, setEffectTriggered] = useState(false);
    
    useEffect(() => {
            const fetchData = async () => {
                const productList: cart[] = await getCartItems(userId);
                setJsonData(productList);
            };
            fetchData();
        }, [effectTriggered]);

    return (
        <div className="content" style={{ marginBottom: '100px' }}>
            <div className="mb-4 my-3 top-banner" >
                <h1>Shopping Cart</h1>
            </div>
            <CartCards triggerEffect={() => setEffectTriggered(!effectTriggered)} data={jsonData} />
            <div className="d-flex justify-content-center">
                <Button className="my-2 rounded-pill purchase-link cart-buy-button">Pay Now: £{jsonData.reduce((sum, item) => sum + (item.cost * item.quantity), 0)}</Button>
            </div>
        </div>
    );
};

export default ViewCart;