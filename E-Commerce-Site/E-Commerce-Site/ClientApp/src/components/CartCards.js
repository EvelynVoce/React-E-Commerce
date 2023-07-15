import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {updateStoredQuantity} from "../api/cart";

const Card = ({ id, title, initial_quantity, imagePath, retailer, cost }) => {
    const [quantity, setQuantity] = useState(initial_quantity);

    const incrementCount = async () => {
        setQuantity(quantity + 1);
        await updateStoredQuantity(id, 1);
    };

    const decrementCount = async () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            await updateStoredQuantity(id, -1);
        }
    };
    
    return (
        <div className="card my-3" id={id}>
            <div className="d-flex">
                <img src={`images/${imagePath}`} className="card-img-top cart_image" alt="Card image" />
                <div className="card-body">
                    <h5>{title}</h5>
                    <p>{retailer}</p>
                    <p>£{cost}</p>
                    <FontAwesomeIcon onClick={decrementCount} icon={faMinus} />
                    <span className="mx-4">{quantity}</span>
                    <FontAwesomeIcon onClick={incrementCount} icon={faPlus}/>
                </div>
            </div>
        </div>
    );
};

const CartCards = ({ data }) => {
    return (
        <div className="container mt-5">
            <div id="cart-items" className="mt-4">
                {data.map((item, index) => (
                    <Card key={index} id={item.cartId} initial_quantity={item.quantity} title={item.title} imagePath={item.imagePath}
                          retailer={item.retailer} cost={item.cost} />
                ))}
            </div>
        </div>
    );
};

export default CartCards;