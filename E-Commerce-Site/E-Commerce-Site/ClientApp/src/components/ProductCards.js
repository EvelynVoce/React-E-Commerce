﻿import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ id, title, imagePath, retailer, cost }) => {
    const [hoverLiked, setHoverLiked] = useState(false);
    const [liked, setLiked] = useState(false);
    
    const history = useHistory();
    const decodedProductName  = decodeURIComponent(title).replace(/\s+/g, "-");
    
    const handleClick = () => {
        document.cookie = `itemId=${id}`;
        history.push(`/products/${decodedProductName }`);
    };

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

    return (
        <div className="col mb-3">
            <div className="card product_card h-100" id={id} onClick={handleClick}>
                <img
                    src={`images/${imagePath}`}
                    alt={title}
                    className="card-img-top img-fluid product_image"
                />
                <div className="card-body">
                    <div className="row row-cols-12">
                        <div className="col-10">
                            <h5 className="card-title mb-3" style={{ height: '50px' }}>
                                {title}
                            </h5>
                        </div>
                        <div className={`col-2 d-flex justify-content-end`}>
                            <div className="like-button"
                                 onClick={handleLike}
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverOut}>
                                <FontAwesomeIcon style={{ height: '25px' }} icon={hoverLiked ? ['fas', 'heart'] : ['far', 'heart']} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>{retailer}</h5>
                        <h5>£{cost}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductCards = ({ data }) => {
    return (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {data.map((item, index) => (
                <Card key={index} id={item.id} title={item.title} imagePath={item.imagePath}
                      retailer={item.retailer} cost={item.cost} />
            ))}
        </div>
    );
};

export default ProductCards;