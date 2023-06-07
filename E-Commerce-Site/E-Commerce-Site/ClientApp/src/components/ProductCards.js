import React from 'react';
import { useHistory } from 'react-router-dom';

const Card = ({ id, title, imagePath, retailer, cost}) => {

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
                    alt={title}
                    className="card-img-top img-fluid"
                />
                <div className="card-body">
                    <h5 className="card-title mb-3">{title}</h5>
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