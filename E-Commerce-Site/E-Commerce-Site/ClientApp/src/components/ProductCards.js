import React from 'react';

const Card = ({ title, alt, imagePath}) => {
    return (

    <div className="col mb-3 itemCard">
        <div className="card h-100" id="${item.id}">
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
            {data.map((item, index) => (
                <Card key={index} title={item.title} altText={item.alt} imagePath={item.imagePath} />
            ))}
        </div>
    );
};

export default ProductCards;