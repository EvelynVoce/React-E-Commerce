import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import {removeItem, updateStoredQuantity} from "../api/cart";
import Modal from "react-modal";

interface CardProps {
    triggerEffect: () => void;
    cartId: string;
    title: string;
    initial_quantity: number;
    imagePath: string;
    retailer: string;
    cost: number;
}

const Card: React.FC<CardProps> = ({ triggerEffect, cartId, title, initial_quantity, imagePath, retailer, cost }) => {
    const [quantity, setQuantity] = useState(initial_quantity);
    const [showModal, setShowModal] = useState(false);

    const appElement: HTMLElement | null = document.getElementById('root');


    const incrementCount = async () => {
        setQuantity(quantity + 1);
        await updateStoredQuantity(cartId, 1);
        triggerEffect();
    };

    const decrementCount = async () => {
        if (quantity-1 > 0) {
            setQuantity(quantity - 1);
            await updateStoredQuantity(cartId, -1);
            triggerEffect();
        }
        else {
            setShowModal(true);
        }
    };

    const handleRemoveItem = async () => {
        await removeItem(cartId);
        triggerEffect();
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };
    
    return (
        <div className="card my-3" id={cartId}>
            <div className="d-flex">
                <img src={`images/${imagePath}`} className="card-img-top cart_image" alt="Card image" />
                <div className="card-body">
                    <h5>{title}</h5>
                    <p>{retailer}</p>
                    <p>£{cost}</p>
                    <FontAwesomeIcon className="quantity-button" onClick={decrementCount} icon={faMinus} />
                    <span className="mx-4">{quantity}</span>
                    <FontAwesomeIcon className="quantity-button" onClick={incrementCount} icon={faPlus}/>
                </div>

                {(appElement != null ) ? (
                    <Modal
                        appElement={appElement}
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
                ): ""}
            </div>
        </div>
    );
};

// @ts-ignore
const CartCards = ({ triggerEffect, data }) => {
    return (
        <div className="container mt-5">
            <div id="cart-items" className="mt-4">
                {data.map((item: { cartId: any; quantity: any; title: any; imagePath: any; retailer: any; cost: any; }, index: React.Key | null | undefined) => (
                    <Card key={index} triggerEffect={triggerEffect} cartId={item.cartId} initial_quantity={item.quantity} title={item.title} imagePath={item.imagePath}
                          retailer={item.retailer} cost={item.cost} />
                ))}
            </div>
        </div>
    );
};

export default CartCards;