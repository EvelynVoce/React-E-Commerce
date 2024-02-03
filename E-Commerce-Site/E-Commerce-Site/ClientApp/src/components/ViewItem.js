import React, { useEffect, useState } from 'react';
import { getItemDetails } from "../api/products";
import { getIsLiked } from "../api/liked_items"
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addItemToCart} from "../api/cart";
import {useHistory} from 'react-router-dom';

const ViewItem = ({ userId }) => {
    const [itemData, setItemData] = useState(null);
    const [hoverLiked, setHoverLiked] = useState(false);
    const [liked, setLiked] = useState(false);

    const history = useHistory();
    
    const handleAddToCart = async () => {
        const itemId = getCookie("itemId");
        const quantity = 1;
        
        //Send to backend where it then generates cartID and writes to db 
        await addItemToCart(userId, itemId, quantity);
        history.push('/');

    }

    const handleHover = () => {
        setHoverLiked(!liked);
    };

    const handleHoverOut = () => {
        setHoverLiked(liked);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setLiked(!liked);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const itemId = getCookie("itemId");
            const data = await getItemDetails(itemId);
            setItemData(data[0]);
            
            if (userId) {
                const liked = await getIsLiked(userId, itemId);
                setHoverLiked(liked);
                setLiked(liked);
            }
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
        <div className="my-5 row content">
            <div className="col-md-8 order-md-2">
                <div className="row" style={{ overflowX: 'hidden' }}>
                    <div className="col-9">
                        <h1 className="item-heading">{itemData.title}</h1>
                    </div>
                    <div className="col-3 text-right">
                        <h1 className="item-heading">£{itemData.cost}</h1>
                    </div>
                </div>
                <hr />
                <p>{itemData.description}</p>

                <div style={{ display: 'flex' }}>
                    <p>{itemData.retailer}</p>
                    <div className="like-button"
                         onClick={handleLike}
                         onMouseEnter={handleHover}
                         onMouseLeave={handleHoverOut}>
                        <FontAwesomeIcon style={{ paddingLeft: '20px', height: '25px' }} icon={hoverLiked ? ['fas', 'heart'] : ['far', 'heart']} />
                    </div>
                </div>
                <Button onClick={handleAddToCart} className="rounded-pill purchase-link d-none d-md-block" style={{width: "100%"}} variant="primary" target="_blank" rel="noopener noreferrer">
                    Add to Cart
                </Button>
                <Button href={itemData.link} className="rounded-pill purchase-link d-none d-md-block my-3" variant="primary" target="_blank" rel="noopener noreferrer">
                    Purchase Here
                </Button>
            </div>

            <div className="col-md-4 order-md-1">
                <div className="card h-100">
                    <img
                        src={`images/${itemData.imagePath}`}
                        className="card-img-top img-fluid product_image"
                        alt="test"/>
                </div>
            </div>
            
            <Button onClick={handleAddToCart} className="my-3 rounded-pill purchase-link d-block d-md-none" variant="primary" target="_blank" rel="noopener noreferrer">
                Add to Cart
            </Button>
            <Button href={itemData.link} className="my-3 rounded-pill purchase-link d-block d-md-none" variant="primary" target="_blank" rel="noopener noreferrer">
                Purchase Here
            </Button>
        </div>
    );
}

export default ViewItem;
