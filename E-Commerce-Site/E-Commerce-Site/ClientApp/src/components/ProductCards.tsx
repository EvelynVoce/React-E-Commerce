import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {addLikedItem, removeLikedItem} from "../api/liked_items";
import Products from "../Models/Products";


interface ProductCardProps {
    userId: string;
    itemId: string;
    title: string;
    imagePath: string;
    retailer: string;
    cost: number;
    initialLikedState: boolean;
}

const Card: React.FC<ProductCardProps> = ({...props}) => {
    const [hoverLiked, setHoverLiked] = useState(props.initialLikedState);
    const [liked, setLiked] = useState(props.initialLikedState);

    const history = useHistory();
    const decodedProductName  = decodeURIComponent(props.title).replace(/\s+/g, "-");
    
    const handleClick = () => {
        document.cookie = `itemId=${props.itemId}`;
        history.push(`/products/${decodedProductName }`);
    };

    const handleHover = () => {
        setHoverLiked(!liked);
    };

    const handleHoverOut = () => {
        setHoverLiked(liked);
    };
    
    const handleLike = async(e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        const updatedLiked = !liked;
        setLiked(updatedLiked);
        if (updatedLiked) {
            await addLikedItem(props.userId, props.itemId);
        }
        else {
            await removeLikedItem(props.userId, props.itemId);
        }
    };

    useEffect(() => {
        setHoverLiked(props.initialLikedState);
        setLiked(props.initialLikedState);
    }, [props.initialLikedState]);

    return (
        <div className="col mb-3">
            <div className="card product_card h-100" id={props.itemId} onClick={handleClick}>
                <img
                    src={`images/${props.imagePath}`}
                    alt={props.title}
                    className="card-img-top img-fluid product_image"
                />
                <div className="card-body">
                    <div className="row row-cols-12">
                        <div className="col-10">
                            <h5 className="card-title mb-3" style={{ height: '50px' }}>
                                {props.title}
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
                        <h5>{props.retailer}</h5>
                        <h5>£{props.cost}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};



interface ProductProps {
    userId: string;
    productData: Products[];
    likedItems: Products[];
}

const ProductCards: React.FC<ProductProps> = ({ userId, productData, likedItems }) => {
    return (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {productData.map((item: Products, index: React.Key | null | undefined) => {
                const isLiked = likedItems.some((likedItem: Products) => likedItem.id === item.id);
                return (
                    <Card key={index} userId={userId} itemId={item.id} title={item.title} imagePath={item.imagePath}
                          retailer={item.retailer} cost={item.cost} initialLikedState={isLiked}/>
                );
            })}
        </div>
    );
};

export default ProductCards;