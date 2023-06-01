import React from 'react';
import { useHistory } from 'react-router-dom';

const Card = ({ id, title, alt, imagePath}) => {

    const history = useHistory();
    const decodedProductName  = decodeURIComponent(title).replace(/\s+/g, "-");

    const handleClick = () => {
        document.cookie = "itemId=" + id;
        history.push(`/products/${decodedProductName }`);
    };
    
    return (
        <div className="col mb-3 itemCard" onClick={handleClick}>
            <div className="card h-100" id={id}>
                <img
                    src={`images/${imagePath}`}
                    alt={alt}
                    className="card-img-top img-fluid"
                />
                <div className="card-body">
                    <h5 className="card-title mb-5">{title}</h5>
                </div>
            </div>
        </div>
    );
};

const ProductCards = ({ data }) => {
    return (
        <div className="row row-cols-1 row-cols-md-4">
            {data.map((item) => (
                <Card id={item.id} title={item.title} altText={item.alt} imagePath={item.imagePath} />
            ))}
        </div>
    );
};

export default ProductCards;