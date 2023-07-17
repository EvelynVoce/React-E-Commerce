import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {updateStoredQuantity} from "../api/cart";
import Modal from "react-modal";

const Card = ({triggerEffect, id, title, initial_quantity, imagePath, retailer, cost }) => {
    const [quantity, setQuantity] = useState(initial_quantity);
    const [showModal, setShowModal] = useState(false);

    const incrementCount = async () => {
        setQuantity(quantity + 1);
        await updateStoredQuantity(id, 1);
        triggerEffect();
    };

    const decrementCount = async () => {
        if (quantity-1 > 0) {
            setQuantity(quantity - 1);
            await updateStoredQuantity(id, -1);
            triggerEffect();
        }
        else {
            setShowModal(true);
        }
    };

    const handleRemoveItem = async () => {
        // Remove item from cart
        
        triggerEffect();

        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
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

                <Modal
                    isOpen={showModal}
                    onRequestClose={handleCancel}
                    className="modal_cart"
                    contentLabel="Remove Item Modal"
                >
                    <p>Are you sure you want to remove this item from your cart?</p>
                    <div className="button-container">
                        <button className="mx-2 rounded-pill purchase-link" onClick={handleRemoveItem}>Yes</button>
                        <button className="mx-2 rounded-pill purchase-link" onClick={handleCancel}>No</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

const CartCards = ({ triggerEffect, data }) => {
    return (
        <div className="container mt-5">
            <div id="cart-items" className="mt-4">
                {data.map((item, index) => (
                    <Card key={index} triggerEffect={triggerEffect} id={item.cartId} initial_quantity={item.quantity} title={item.title} imagePath={item.imagePath}
                          retailer={item.retailer} cost={item.cost} />
                ))}
            </div>
        </div>
    );
};

export default CartCards;